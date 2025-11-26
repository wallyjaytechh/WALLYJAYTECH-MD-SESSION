const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Maher_Zubair,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};

router.get('/', async (req, res) => {
	const id = makeid();
	async function WALLYJAYTECH_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code = Maher_Zubair({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code.ev.on('creds.update', saveCreds)
			Qr_Code.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					
					// Create creds.js file content
					const credsContent = `module.exports = ${data.toString()};`;
					
					// Send as creds.js file
					await Qr_Code.sendMessage(Qr_Code.user.id, {
						document: Buffer.from(credsContent),
						mimetype: 'application/javascript',
						fileName: 'creds.js'
					});

					let WALLYJAYTECH_TEXT = `
╔═══════════════════════
║  🚀 WALLYJAYTECH-MD 🚀
╠═══════════════════════
║ ✅ *SESSION GENERATED SUCCESSFULLY*
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
║ ⭐ *Follow and Star my repo for more updates!*
╚═══════════════════════`;

					await Qr_Code.sendMessage(Qr_Code.user.id, {text: WALLYJAYTECH_TEXT});

					await delay(100);
					await Qr_Code.ws.close();
					return await removeFile('./temp/' + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					WALLYJAYTECH_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile('./temp/' + id);
		}
	}
	return await WALLYJAYTECH_MD_QR_CODE()
});
module.exports = router
