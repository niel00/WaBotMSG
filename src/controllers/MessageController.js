const MenuView = require('../views/MenuView');
const prefix = require('../config');
const admins = require('../config');

class MessageController {
    static async handleMessage(sock, msg) {
        const remoteJid = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        // 1. Se a mensagem não começar com o prefixo, o bot ignora
        if (!text.startsWith(prefix)) return;

        // 2. Separa a string recebida. Ex: "!info projeto" vira command="info", args=["projeto"]
        const args = text.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        let response = '';

        // 3. Roteamento de Comandos
        switch (command) {
            case 'menu':
            case 'ajuda':
                response = MenuView.getMainMenu();
                break;
            
            case 'ping':
                response = 'Pong! 🏓 Conexão estável e operando.';
                break;

            case 'info':
                response = 'Bot em desenvolvimento por Daniel. Foco em arquitetura MVC e integração fullstack! 🚀';
                break;

            default:
                response = `Comando *${prefix}${command}* não reconhecido. Digite *!menu* para ver as opções.`;
        }

        // 4. Envia a resposta de volta ao usuário
        if (response !== '') {
            await sock.sendMessage(remoteJid, { text: response });
        }
    }
}

module.exports = MessageController;