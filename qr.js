import express from 'express';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, Browsers, jidNormalizedUser, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import { delay } from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import qrcodeTerminal from 'qrcode-terminal';

const router = express.Router();

// Function to remove files or directories
function removeFile(FilePath) {
    try {
        if (!fs.existsSync(FilePath)) return false;
        fs.rmSync(FilePath, { recursive: true, force: true });
        return true;
    } catch (e) {
        console.error('Error removing file:', e);
        return false;
    }
}

router.get('/', async (req, res) => {
    // Generate unique session for each request to avoid conflicts
    const sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const dirs = `./qr_sessions/session_${sessionId}`;

    // Ensure qr_sessions directory exists
    if (!fs.existsSync('./qr_sessions')) {
        fs.mkdirSync('./qr_sessions', { recursive: true });
    }

    async function initiateSession() {
        // ✅ PERMANENT FIX: Create the session folder before anything
        if (!fs.existsSync(dirs)) fs.mkdirSync(dirs, { recursive: true });

        const { state, saveCreds } = await useMultiFileAuthState(dirs);

        try {
            const { version, isLatest } = await fetchLatestBaileysVersion();
            
            let qrGenerated = false;
            let responseSent = false;

            // QR Code handling logic
            const handleQRCode = async (qr) => {
                if (qrGenerated || responseSent) return;
                
                qrGenerated = true;
                console.log('🟢 QR Code Generated! Scan it with your WhatsApp app.');
                console.log('📋 Instructions:');
                console.log('1. Open WhatsApp on your phone');
                console.log('2. Go to Settings > Linked Devices');
                console.log('3. Tap "Link a Device"');
                console.log('4. Scan the QR code below');
                // Display QR in terminal
                qrcodeTerminal.generate(qr, { small: true });
                try {
                    // Generate QR code as data URL
                    const qrDataURL = await QRCode.toDataURL(qr, {
                        errorCorrectionLevel: 'M',
                        type: 'image/png',
                        quality: 0.92,
                        margin: 1,
                        color: {
                            dark: '#000000',
                            light: '#00FFFF' // Cyan background
                        }
                    });

                    if (!responseSent) {
                        responseSent = true;
                        console.log('QR Code generated successfully');
                        await res.send({ 
                            qr: qrDataURL, 
                            message: 'QR Code Generated! Scan it with your WhatsApp app.',
                            instructions: [
                                '1. Open WhatsApp on your phone',
                                '2. Go to Settings > Linked Devices',
                                '3. Tap "Link a Device"',
                                '4. Scan the QR code above'
                            ]
                        });
                    }
                } catch (qrError) {
                    console.error('Error generating QR code:', qrError);
                    if (!responseSent) {
                        responseSent = true;
                        res.status(500).send({ code: 'Failed to generate QR code' });
                    }
                }
            };

            // Improved Baileys socket configuration
            const socketConfig = {
                version,
                logger: pino({ level: 'silent' }),
                browser: Browsers.windows('Chrome'),
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                markOnlineOnConnect: false,
                generateHighQualityLinkPreview: false,
                defaultQueryTimeoutMs: 60000,
                connectTimeoutMs: 60000,
                keepAliveIntervalMs: 30000,
                retryRequestDelayMs: 250,
                maxRetries: 5,
            };

            // Create socket and bind events
            let sock = makeWASocket(socketConfig);
            let reconnectAttempts = 0;
            const maxReconnectAttempts = 3;

            // Connection event handler function
            const handleConnectionUpdate = async (update) => {
                const { connection, lastDisconnect, qr } = update;
                console.log(`🔄 Connection update: ${connection || 'undefined'}`);

                if (qr && !qrGenerated) {
                    await handleQRCode(qr);
                }

                if (connection === 'open') {
                    console.log('✅ Connected successfully!');
                    console.log('💾 Session saved to:', dirs);
                    reconnectAttempts = 0;
                    
                    try {
                        // ✅ FIX: Wait longer for credentials to be fully saved
                        console.log('⏳ Waiting for credentials to save...');
                        await delay(4000);
                        
                        // ✅ FIX: Check session directory contents
                        console.log('📁 Checking session directory contents:');
                        const sessionFiles = fs.readdirSync(dirs);
                        let foundCreds = false;
                        
                        for (const file of sessionFiles) {
                            const filePath = path.join(dirs, file);
                            const stats = fs.statSync(filePath);
                            console.log(`   📄 ${file} - ${stats.size} bytes`);
                            if (file === 'creds.json' && stats.size > 0) {
                                foundCreds = true;
                            }
                        }
                        
                        if (!foundCreds) {
                            console.log('❌ creds.json not found or empty in session directory!');
                            // Try to force save credentials
                            await saveCreds();
                            await delay(2000);
                        }
                        
                        const credsPath = path.join(dirs, 'creds.json');
                        if (!fs.existsSync(credsPath)) {
                            console.log('❌ creds.json does not exist after connection!');
                            return;
                        }
                        
                        const stats = fs.statSync(credsPath);
                        if (stats.size === 0) {
                            console.log('❌ creds.json is empty (0 bytes)!');
                            return;
                        }
                        
                        console.log(`✅ creds.json verified: ${stats.size} bytes`);
                        
                        // Read the session file
                        const sessionWallyjaytech = fs.readFileSync(credsPath);
                        
                        // Get the user's JID from the session
                        const userJid = Object.keys(sock.authState.creds.me || {}).length > 0 
                            ? jidNormalizedUser(sock.authState.creds.me.id) 
                            : null;
                            
                        if (userJid) {
                            // Send session file to user
                            await sock.sendMessage(userJid, {
                                document: sessionWallyjaytech,
                                mimetype: 'application/json',
                                fileName: 'WALLYJAYTECH-MD-creds.json'
                            });
                            console.log("📄 Session file sent successfully to", userJid);
                            
                            // Send welcome message with WALLYJAYTECH-MD branding
                            await sock.sendMessage(userJid, {
                                image: { url: 'https://i.ibb.co/TLG3Mb4/photo-2024-11-01-16-00-22.jpg' },
                                caption: `🤖 *WALLYJAYTECH-MD V 1.0.0*\n\n✅ Successfully Connected!\n🚀 Bug Fixes + New Commands + Fast AI Chat\n\n📺 YouTube: @wallyjaytechy\n📱 Telegram: @wallyjaytech\n💻 GitHub: wallyjaytechh\n📞 WhatsApp: +2348144317152`
                            });
                            console.log("✅ Welcome message sent successfully");
                            
                            // Send warning message with WALLYJAYTECH-MD branding
                            await sock.sendMessage(userJid, {
                                text: `⚠️ *IMPORTANT SECURITY WARNING* ⚠️\n\nDo not share this creds.json file with anybody!\n\n┌┤✑ Thanks for using WALLYJAYTECH-MD\n│└────────────┈ ⳹        \n│© 2025 Wally Jay Tech\n└─────────────────┈ ⳹\n\n🔗 YouTube: https://youtube.com/@wallyjaytechy\n🔗 Telegram: https://t.me/wallyjaytech\n🔗 GitHub: https://github.com/wallyjaytechh`
                            });
                        } else {
                            console.log("❌ Could not determine user JID to send session file");
                        }
                    } catch (error) {
                        console.error("Error sending session file:", error);
                    }
                    
                    // Clean up session after successful connection and sending files
                    setTimeout(() => {
                        console.log('🧹 Cleaning up WALLYJAYTECH-MD session...');
                        const deleted = removeFile(dirs);
                        if (deleted) {
                            console.log('✅ Session cleaned up successfully');
                        } else {
                            console.log('❌ Failed to clean up session folder');
                        }
                    }, 15000);
                }

                if (connection === 'close') {
                    console.log('❌ WALLYJAYTECH-MD Connection closed');
                    if (lastDisconnect?.error) {
                        console.log('❗ Last Disconnect Error:', lastDisconnect.error);
                    }
                    
                    const statusCode = lastDisconnect?.error?.output?.statusCode;
                    
                    if (statusCode === 401) {
                        console.log('🔐 Logged out - need new QR code');
                        removeFile(dirs);
                    } else if (statusCode === 515 || statusCode === 503) {
                        console.log(`🔄 Stream error (${statusCode}) - attempting to reconnect...`);
                        reconnectAttempts++;
                        
                        if (reconnectAttempts <= maxReconnectAttempts) {
                            console.log(`🔄 Reconnect attempt ${reconnectAttempts}/${maxReconnectAttempts}`);
                            setTimeout(() => {
                                try {
                                    sock = makeWASocket(socketConfig);
                                    sock.ev.on('connection.update', handleConnectionUpdate);
                                    sock.ev.on('creds.update', saveCreds);
                                } catch (err) {
                                    console.error('Failed to reconnect:', err);
                                }
                            }, 2000);
                        } else {
                            console.log('❌ Max reconnect attempts reached');
                            if (!responseSent) {
                                responseSent = true;
                                res.status(503).send({ code: 'Connection failed after multiple attempts' });
                            }
                        }
                    } else {
                        console.log('🔄 Connection lost - attempting to reconnect...');
                    }
                }
            };

            // Bind the event handlers
            sock.ev.on('connection.update', handleConnectionUpdate);
            sock.ev.on('creds.update', saveCreds);

            // Set a timeout to clean up if no QR is generated
            setTimeout(() => {
                if (!responseSent) {
                    responseSent = true;
                    res.status(408).send({ code: 'QR generation timeout' });
                    removeFile(dirs);
                }
            }, 30000);

        } catch (err) {
            console.error('Error initializing WALLYJAYTECH-MD session:', err);
            if (!res.headersSent) {
                res.status(503).send({ code: 'Service Unavailable' });
            }
            removeFile(dirs);
        }
    }

    await initiateSession();
});

// Global uncaught exception handler
process.on('uncaughtException', (err) => {
    let e = String(err);
    if (e.includes("conflict")) return;
    if (e.includes("not-authorized")) return;
    if (e.includes("Socket connection timeout")) return;
    if (e.includes("rate-overlimit")) return;
    if (e.includes("Connection Closed")) return;
    if (e.includes("Timed Out")) return;
    if (e.includes("Value not found")) return;
    if (e.includes("Stream Errored")) return;
    if (e.includes("Stream Errored (restart required)")) return;
    if (e.includes("statusCode: 515")) return;
    if (e.includes("statusCode: 503")) return;
    console.log('WALLYJAYTECH-MD Caught exception: ', err);
});

export default router;
