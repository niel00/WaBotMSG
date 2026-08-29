const MenuView = require('../views/MenuView');
const { prefix } = require('../config');

class MessageController {
    static async handleMessage(sock, msg) {
        const remoteJid = msg.key.remoteJid;
        const text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            msg.message?.imageMessage?.caption ||
            '';

        if (!text) return;

        if (!text.startsWith(prefix)) {
            const response =
                `Digite *${prefix}menu* para acessar o menu de opções ou *${prefix}ajuda* para obter ajuda.`;

            await sock.sendMessage(remoteJid, { text: response });
            return;
        }

        const args = text.slice(prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        if (!command) return;

        let response = '';

        switch (command) {
            case 'menu':
                response = MenuView.getMainMenu();
                break;

            case 'ajuda':
                response = MenuView.getHelpMenu();
                break;

            case 'ping':
                response = 'Pong! 🏓 Conexão estável e operando.';
                break;

            case 'info':
                response = 'Bot em desenvolvimento por Daniel. Foco em arquitetura MVC e integração fullstack! 🚀';
                break;

            default:
                response = `Comando *${prefix}${command}* não reconhecido. Digite *${prefix}menu* para ver as opções.`;
        }

        if (response) {
            await sock.sendMessage(remoteJid, { text: response });
        }
    }
}

module.exports = MessageController;