const prefix = require('../config')
class MenuView {
    static getMainMenu() {
        return `🤖 *Menu Principal*\n\n` +
               `Escolha uma das opções abaixo:\n\n` +
               `*${prefix}ping* - Testar a conexão do bot\n` +
               `*${prefix}info* - Informações do sistema\n` +
               `*${prefix}menu* - Exibir esta lista novamente\n\n` +
               `_Digite o comando desejado:_`;
    }
}

module.exports = MenuView;