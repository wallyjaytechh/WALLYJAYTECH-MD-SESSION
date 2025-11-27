const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Mbuvi_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function Mbuvi_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Mbuvi_Tech = Mbuvi_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                version: [2, 3000, 1025190524],
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: ["Windows", "Firefox", "130.0.1"],
            });

            if (!Pair_Code_By_Mbuvi_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
               const custom = "WALLYBOT"; // 8 characters like the original "JUNEXBOT"
                const code = await Pair_Code_By_Mbuvi_Tech.requestPairingCode(num, custom);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Mbuvi_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Mbuvi_Tech.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    await Pair_Code_By_Mbuvi_Tech.newsletterFollow("120363423767541304@newsletter");
                    await Pair_Code_By_Mbuvi_Tech.groupAcceptInvite("Hd14oCh8LT1A3EheIpZycL");
                    await delay(5000);
                    
                    // Read and send creds.json directly
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(1000);
                    
                    // Send the creds.json content directly without prefix
                    let session = await Pair_Code_By_Mbuvi_Tech.sendMessage(
                        Pair_Code_By_Mbuvi_Tech.user.id, 
                        { 
                            document: Buffer.from(data), 
                            fileName: 'creds.json', 
                            mimetype: 'application/json' 
                        }
                    );

                    let Wallyjay_Tech_TEXT = `
╔════════════════════
║『 SESSION CONNECTED』
║ 🟢 BOT: WallyJayTech
║ 🟢 OWNER: WallyJay
║ 🟢 TYPE: creds.json
╚════════════════════

Session file (creds.json) has been sent!
Save this file for your bot.

Don't Forget To Give Star⭐ To My Repo
______________________________`;

                    await Pair_Code_By_Mbuvi_Tech.sendMessage(
                        Pair_Code_By_Mbuvi_Tech.user.id, 
                        { text: Wallyjay_Tech_TEXT }, 
                        { quoted: session }
                    );

                    await delay(100);
                    await Pair_Code_By_Mbuvi_Tech.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    Mbuvi_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }
    
    return await Mbuvi_MD_PAIR_CODE();
});

module.exports = router;
