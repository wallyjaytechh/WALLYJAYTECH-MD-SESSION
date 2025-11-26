import fs from 'fs';
import path from 'path';
import { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, Browsers, fetchLatestBaileysVersion, delay } from '@whiskeysockets/baileys';
import pino from 'pino';

export class SessionManager {
    constructor(sessionId) {
        this.sessionId = sessionId;
        this.sessionDir = `./sessions/${sessionId}`;
        this.isConnected = false;
        this.credsSaved = false;
    }

    // Ensure session directory exists
    ensureSessionDir() {
        if (!fs.existsSync(this.sessionDir)) {
            fs.mkdirSync(this.sessionDir, { recursive: true });
        }
    }

    // Initialize WhatsApp connection
    async initializeConnection() {
        this.ensureSessionDir();
        
        const { state, saveCreds } = await useMultiFileAuthState(this.sessionDir);
        
        const { version } = await fetchLatestBaileysVersion();
        
        const sock = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            browser: Browsers.ubuntu('Chrome'),
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino()),
            },
            markOnlineOnConnect: false,
            generateHighQualityLinkPreview: false,
        });

        // Handle credentials updates
        sock.ev.on('creds.update', saveCreds);

        return { sock, state, saveCreds };
    }

    // Check if session is valid
    isSessionValid() {
        const credsPath = path.join(this.sessionDir, 'creds.json');
        return fs.existsSync(credsPath) && fs.statSync(credsPath).size > 100;
    }

    // Get session data
    getSessionData() {
        if (!this.isSessionValid()) {
            return null;
        }
        
        try {
            const credsPath = path.join(this.sessionDir, 'creds.json');
            const credsData = fs.readFileSync(credsPath, 'utf8');
            return JSON.parse(credsData);
        } catch (error) {
            return null;
        }
    }

    // Cleanup session
    cleanup() {
        try {
            if (fs.existsSync(this.sessionDir)) {
                fs.rmSync(this.sessionDir, { recursive: true, force: true });
            }
        } catch (error) {
            console.error('Cleanup error:', error);
        }
    }
}
