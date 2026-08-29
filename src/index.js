const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');

const MessageController = require('./controllers/MessageController');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'info' }),
        browser: ['WaBotMSG', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('\n[!] Escaneie o QR Code abaixo para conectar:\n');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const erroCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = erroCode !== DisconnectReason.loggedOut;

            console.log(`\n[!] Conexão fechada. Motivo (código): ${erroCode}`);

            if (shouldReconnect) {
                console.log('[!] Tentando reconectar ao WhatsApp...');
                connectToWhatsApp();
            } else {
                console.log('[X] Você foi deslogado. Apague a pasta "auth_info_baileys" e reinicie.');
            }
        } else if (connection === 'open') {
            console.log('\n[V] Bot conectado com sucesso e operando em MVC!');
        }
    });

    function atualizarConversaTerminal(msg) {
        const rawJid = msg?.key?.remoteJid || msg?.key?.participant || 'desconhecido';
        const jid = rawJid.endsWith('@lid') ? rawJid.replace('@lid', '@s.whatsapp.net') : rawJid;

        const text =
            msg?.message?.conversation ||
            msg?.message?.extendedTextMessage?.text ||
            msg?.message?.imageMessage?.caption ||
            '';

        console.log(`Numero:${jid} - MSG: ${text}`);
    }

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];

        if (!msg.message || msg.key.fromMe) return;

        atualizarConversaTerminal(msg);

        try {
            await MessageController.handleMessage(sock, msg);
        } catch (error) {
            console.error('[X] Erro no Controller ao processar a mensagem:', error);
        }
    });
}

connectToWhatsApp();