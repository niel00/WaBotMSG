const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'info' }), 
        browser: ['WaBotMSG', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    // Bloco connection.update 
sock.ev.on('connection.update', (update) => {
        // Agora nós pegamos o 'qr' de dentro do update
        const { connection, lastDisconnect, qr } = update;
        
        // Se o WhatsApp mandar um QR Code, nós desenhamos ele pequeno na tela
        if (qr) {
            console.log('Escaneie o QR Code abaixo:');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            const erroCode = lastDisconnect.error?.output?.statusCode;
            const shouldReconnect = erroCode !== DisconnectReason.loggedOut;
            
            console.log(`Conexão fechada. Motivo (código): ${erroCode}`);

            if (shouldReconnect) {
                console.log('Tentando reconectar...');
                connectToWhatsApp();
            } else {
                console.log('Você foi deslogado. Apague a pasta "auth_info_baileys" e reinicie.');
            }
        } else if (connection === 'open') {
            console.log('Bot conectado e pronto para uso!');
        }
    });

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        console.log(`Mensagem recebida de ${msg.key.remoteJid}: ${text}`);
    });
}

connectToWhatsApp();