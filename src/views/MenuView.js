const { prefix } = require('../config');

class MenuView {
    static getMainMenu() {
        return `🤖 *Menu Principal*\n\n` +
               `Escolha uma das opções abaixo:\n\n` +
               `*${prefix}ping* - Testar a conexão do bot\n` +
               `*${prefix}info* - Informações do sistema\n` +
               `*${prefix}menu* - Exibir esta lista novamente\n` +
               `*${prefix}ajuda* - Mostrar ajuda do bot\n\n` +
               `_Digite o comando desejado:_`;
    }

    static getHelpMenu() {
        return `🤖 *Ajuda do Bot*\n\n` +
               `Use os comandos com o prefixo *${prefix}*.\n\n` +
               `*${prefix}menu* - Mostra o menu principal\n` +
               `*${prefix}ajuda* - Mostra esta ajuda\n` +
               `*${prefix}ping* - Testa a conexão do bot\n` +
               `*${prefix}info* - Mostra informações sobre o bot\n\n` +
               `Exemplo: *${prefix}ping*`;
    }
}

module.exports = MenuView;