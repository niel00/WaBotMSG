const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');

// IMPORTANTE: Aqui você importa apenas o seu Controller principal.
const MessageController = require('./controllers/MessageController');

async function connectToWhatsApp() {
    // 1. Gerenciamento de Sessão
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    // 2. Inicialização do Bot
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }), // Oculta logs excessivos da biblioteca
        browser: ['WaBotMSG', 'Chrome', '1.0.0'] // Nome do seu bot
    });

    // 3. Salva chaves de segurança atualizadas
    sock.ev.on('creds.update', saveCreds);

    // 4. Monitoramento da Conexão (QR Code e Reconexão)
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        // Desenha o QR Code se necessário
        if (qr) {
            console.log('\n[!] Escaneie o QR Code abaixo para conectar:\n');
            qrcode.generate(qr, { small: true });
        }
        
        // Lida com fechamento de conexão
        if (connection === 'close') {
            const erroCode = lastDisconnect.error?.output?.statusCode;
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

    // 5. Escutando e roteando mensagens
    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        
        // Filtro: ignora mensagens do próprio bot ou do sistema
        if (!msg.message || msg.key.fromMe) return;

        // --- AQUI ACONTECE A INTEGRAÇÃO MVC ---
        // O index.js não tenta ler ou responder o texto. 
        // Ele apenas "entrega" o problema para o Controller resolver.
        try {
            await MessageController.handleMessage(sock, msg);
        } catch (error) {
            console.error('[X] Erro no Controller ao processar a mensagem:', error);
        }
    });
}

// Inicia o bot
connectToWhatsApp();