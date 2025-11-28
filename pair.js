const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    if (!num) {
        return res.send({ error: "Phone number is required" });
    }
    
    async function GIFTED_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);
        
        try {
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS("Safari")
            });

            sock.ev.on('creds.update', saveCreds);
            
            if (!sock.authState.creds.registered) {
                await delay(1000);
                num = num.replace(/[^0-9]/g, '');
                
                // Add country code if not present
                if (!num.startsWith('234')) {
                    num = '234' + num;
                }
                
                try {
                    const code = await sock.requestPairingCode(num);
                    
                    if (!res.headersSent) {
                        await res.send({ 
                            code: code,
                            message: "Use this pairing code in your WhatsApp linked devices section"
                        });
                    }
                } catch (pairError) {
                    console.error("Pairing error:", pairError);
                    if (!res.headersSent) {
                        await res.send({ error: "Failed to generate pairing code" });
                    }
                    return;
                }
            }

            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;
                
                if (connection === "open") {
                    await delay(3000);
                    
                    let credsPath = __dirname + `/temp/${id}/creds.json`;
                    
                    try {
                        // Read and update creds to ensure registered is true
                        let credsData = fs.readFileSync(credsPath, 'utf8');
                        let credsJson = JSON.parse(credsData);
                        
                        // Force registered to true since connection is open
                        credsJson.registered = true;
                        
                        // Save updated creds
                        fs.writeFileSync(credsPath, JSON.stringify(credsJson, null, 2));
                        
                        // Read the updated file for sending
                        let updatedCredsData = fs.readFileSync(credsPath, 'utf8');
                        
                        // Send as file (base64 encoded)
                        const fileBuffer = Buffer.from(updatedCredsData, 'utf8');
                        
                        await sock.sendMessage(sock.user.id, {
                            document: fileBuffer,
                            fileName: 'creds.json',
                            mimetype: 'application/json',
                            caption: '*WALLYJAYTECH-MD SESSION CREDS* 🔐\n\nYour session credentials file. Save this file for future use!'
                        });

                        let desc = `
*┏━━━━━━━━━━━━━━*
*┃WALLYJAYTECH-MD SESSION IS*
*┃SUCCESSFULLY*
*┃CONNECTED ✅🔥*
*┗━━━━━━━━━━━━━━━*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❶ || Creator = WALLY JAY TECH*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❷ || Owner =* https://wa.me/+2348144317152
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*POWERED BY WALLYJAYTECH-MD*`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "WALLYJAYTECH-MD👨🏻‍💻",
                                    thumbnailUrl: "https://d.uguu.se/BGVkvwEn.jpg", // UPDATED TO YOUR IMAGE
                                    sourceUrl: "https://whatsapp.com/channel/0029VaD5t8S1nozDfDDjRj2J",
                                    mediaType: 1,
                                    renderLargerThumbnail: false
                                }  
                            }
                        });

                        sock.newsletterFollow("120363192254044294@newsletter");
                        
                    } catch (e) {
                        console.error("Error:", e);
                        await sock.sendMessage(sock.user.id, { 
                            text: `*Error occurred:* ${e.message}` 
                        });
                    }
                    
                    await delay(100);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ | WALLYJAYTECH-MD`);
                    process.exit();
                    
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    GIFTED_MD_PAIR_CODE();
                }
            });
            
        } catch (err) {
            console.log("Service error:", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ error: "Service Unavailable" });
            }
        }
    }
    
    await GIFTED_MD_PAIR_CODE();
});

module.exports = router;
