class MenuView {
    static getMainMenu() {
        return `🤖 *Menu Principal*\n\n` +
               `Escolha uma das opções abaixo:\n\n` +
               `*!ping* - Testar a conexão do bot\n` +
               `*!info* - Informações do sistema\n` +
               `*!menu* - Exibir esta lista novamente\n\n` +
               `_Digite o comando desejado:_`;
    }
}

module.exports = MenuView;