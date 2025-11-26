const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: Maher_Zubair,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function WALLYJAYTECH_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code = Maher_Zubair({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: ["Chrome (Linux)", "", ""]
            });

            if (!Pair_Code.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code.ev.on('creds.update', saveCreds);
            Pair_Code.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);

                    // Create creds.js file content
                    const credsContent = `module.exports = ${data.toString()};`;

                    // Send as creds.js file instead of JSON
                    await Pair_Code.sendMessage(Pair_Code.user.id, {
                        document: Buffer.from(credsContent),
                        mimetype: 'application/javascript',
                        fileName: 'creds.js'
                    });

                    let WALLYJAYTECH_TEXT = `
╔═══════════════════════
║  🚀 WALLYJAYTECH-MD 🚀
╠═══════════════════════
║ ✅ *PAIRED SUCCESSFULLY*
║ 
║ 📁 Your session file "creds.js" has been sent!
║ 💾 Use this file for WALLYJAYTECH-MD BOT
║ 
║ 🌐 *Channel:* https://whatsapp.com/channel/0029Vb64CFeHFxP6SQN1VY0I
║ 👥 *Main GC:* https://chat.whatsapp.com/HF1NuB6nFBaIwdGWgeGtni
║ 💻 *Github:* https://github.com/wallyjaytechh
║ 👨‍💻 *Owner:* https://wa.me/2348144317152
║ 
║ ⚠️ *WARNING:* Do not share your creds.js file with anyone!
║ 🛡️  Keep your session data secure!
╚═══════════════════════`;
                    
                    await Pair_Code.sendMessage(Pair_Code.user.id, { text: WALLYJAYTECH_TEXT });

                    await delay(100);
                    await Pair_Code.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    WALLYJAYTECH_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }
    return await WALLYJAYTECH_MD_PAIR_CODE();
});

module.exports = router;
