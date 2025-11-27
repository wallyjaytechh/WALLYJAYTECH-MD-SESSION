import express from 'express';
import fs from 'fs';
import pino from 'pino';
import { makeWASocket, useMultiFileAuthState, delay, makeCacheableSignalKeyStore, Browsers, jidNormalizedUser, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import pn from 'awesome-phonenumber';

const router = express.Router();

// Ensure the session directory exists
function removeFile(FilePath) {
    try {
        if (!fs.existsSync(FilePath)) return false;
        fs.rmSync(FilePath, { recursive: true, force: true });
    } catch (e) {
        console.error('Error removing file:', e);
    }
}

router.get('/', async (req, res) => {
    let num = req.query.number;
    let dirs = './' + (num || `session`);

    // Remove existing session if present
    await removeFile(dirs);

    // Clean the phone number - remove any non-digit characters
    num = num.replace(/[^0-9]/g, '');

    // Validate the phone number using awesome-phonenumber
    const phone = pn('+' + num);
    if (!phone.isValid()) {
        if (!res.headersSent) {
            return res.status(400).send({ code: 'Invalid phone number. Please enter your full international number (e.g., 15551234567 for US, 447911123456 for UK, 84987654321 for Vietnam, etc.) without + or spaces.' });
        }
        return;
    }
    // Use the international number format (E.164, without '+')
    num = phone.getNumber('e164').replace('+', '');

    async function initiateSession() {
        const { state, saveCreds } = await useMultiFileAuthState(dirs);

        try {
            const { version, isLatest } = await fetchLatestBaileysVersion();
            let Wallyjaytech = makeWASocket({
                version,
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.windows('Chrome'),
                markOnlineOnConnect: false,
                generateHighQualityLinkPreview: false,
                defaultQueryTimeoutMs: 60000,
                connectTimeoutMs: 60000,
                keepAliveIntervalMs: 30000,
                retryRequestDelayMs: 250,
                maxRetries: 5,
            });

            Wallyjaytech.ev.on('connection.update', async (update) => {
                const { connection, lastDisconnect, isNewLogin, isOnline } = update;

                if (connection === 'open') {
                    console.log("✅ WALLYJAYTECH-MD Connected successfully!");
                    console.log("📱 Sending session file to user...");
                    
                    try {
                        // ✅ FIX: Wait for credentials to be saved
                        await delay(2000);
                        
                        const credsPath = dirs + '/creds.json';
                        if (!fs.existsSync(credsPath)) {
                            console.log("❌ creds.json not found!");
                            return;
                        }
                        
                        const sessionWallyjaytech = fs.readFileSync(credsPath);

                        // Send session file to user
                        const userJid = jidNormalizedUser(num + '@s.whatsapp.net');
                        await Wallyjaytech.sendMessage(userJid, {
                            document: sessionWallyjaytech,
                            mimetype: 'application/json',
                            fileName: 'WALLYJAYTECH-MD-creds.json'
                        });
                        console.log("📄 Session file sent successfully");

                        // Send welcome message
                        await Wallyjaytech.sendMessage(userJid, {
                            image: { url: 'https://i.ibb.co/TLG3Mb4/photo-2024-11-01-16-00-22.jpg' },
                            caption: `🤖 *WALLYJAYTECH-MD V 1.0.0*\n\n✅ Successfully Connected via Pair Code!\n🚀 Bug Fixes + New Commands + Fast AI Chat\n\n📺 YouTube: @wallyjaytechy\n📱 Telegram: @wallyjaytech\n💻 GitHub: wallyjaytechh\n📞 WhatsApp: +2348144317152`
                        });
                        console.log("✅ Welcome message sent successfully");

                        // Send warning message
                        await Wallyjaytech.sendMessage(userJid, {
                            text: `⚠️ *IMPORTANT SECURITY WARNING* ⚠️\n\nDo not share this creds.json file with anybody!\n\n┌┤✑ Thanks for using WALLYJAYTECH-MD\n│└────────────┈ ⳹        \n│© 2025 Wally Jay Tech\n└─────────────────┈ ⳹\n\n🔗 YouTube: https://youtube.com/@wallyjaytechy\n🔗 Telegram: https://t.me/wallyjaytech\n🔗 GitHub: https://github.com/wallyjaytechh`
                        });
                        console.log("⚠️ Warning message sent successfully");

                        // Clean up session after use
                        console.log("🧹 Cleaning up WALLYJAYTECH-MD session...");
                        await delay(1000);
                        removeFile(dirs);
                        console.log("✅ Session cleaned up successfully");
                        console.log("🎉 WALLYJAYTECH-MD Process completed successfully!");
                    } catch (error) {
                        console.error("❌ Error sending messages:", error);
                        // Still clean up session even if sending fails
                        removeFile(dirs);
                    }
                }

                if (isNewLogin) {
                    console.log("🔐 New login via pair code");
                }

                if (isOnline) {
                    console.log("📶 Client is online");
                }

                if (connection === 'close') {
                    const statusCode = lastDisconnect?.error?.output?.statusCode;

                    if (statusCode === 401) {
                        console.log("❌ Logged out from WhatsApp. Need to generate new pair code.");
                    } else {
                        console.log("🔁 WALLYJAYTECH-MD Connection closed — restarting...");
                        initiateSession();
                    }
                }
            });

            if (!Wallyjaytech.authState.creds.registered) {
                await delay(3000); // Wait 3 seconds before requesting pairing code
                num = num.replace(/[^\d+]/g, '');
                if (num.startsWith('+')) num = num.substring(1);

                try {
                    console.log(`🔄 WALLYJAYTECH-MD Requesting pairing code for: ${num}`);
                    let code = await Wallyjaytech.requestPairingCode(num);
                    code = code?.match(/.{1,4}/g)?.join('-') || code;
                    
                    if (!res.headersSent) {
                        console.log(`✅ WALLYJAYTECH-MD Pairing code generated: ${code}`);
                        await res.send({ code });
                    }
                } catch (error) {
                    console.error('❌ WALLYJAYTECH-MD Error requesting pairing code:', error);
                    if (!res.headersSent) {
                        res.status(503).send({ 
                            code: 'Failed to get pairing code. Please check:\n1. Phone number format\n2. Wait 5-10 minutes if rate limited\n3. Try QR code method instead' 
                        });
                    }
                }
            }

            Wallyjaytech.ev.on('creds.update', saveCreds);
        } catch (err) {
            console.error('❌ WALLYJAYTECH-MD Error initializing session:', err);
            if (!res.headersSent) {
                res.status(503).send({ code: 'Service Unavailable' });
            }
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
