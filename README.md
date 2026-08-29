# WaBotMSG - WhatsApp Bot em MVC

Um bot para WhatsApp desenvolvido em **Node.js** utilizando a biblioteca **Baileys**. O projeto foi estruturado utilizando o padrão arquitetural **MVC (Model-View-Controller)** para garantir organização, fácil manutenção e escalabilidade.

## 🚀 Funcionalidades

* **Autenticação via QR Code:** Leitura de QR Code diretamente no terminal.
* **Sistema de Sessão:** Salva credenciais localmente para não precisar ler o QR Code a cada reinicialização.
* **Comandos com Prefixo:** Sistema de roteamento de comandos (ex: `!menu`, `!ping`).
* **Arquitetura MVC:** Separação clara entre a lógica de conexão, regras de negócio e formatação de mensagens (Views).

## 🛠️ Tecnologias Utilizadas

* [Node.js](https://nodejs.org/)
* [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) (Conexão com a rede do WhatsApp)
* [pino](https://github.com/pinojs/pino) (Gerenciamento de logs)
* [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) (Exibição do QR Code)

## 📁 Estrutura de Pastas

```text
/WaBotMSG
├── auth_info_baileys/  # (Ignorado no Git) Tokens de sessão do WhatsApp
├── src/
│   ├── controllers/    # Controladores de rotas (ex: MessageController.js)
│   ├── models/         # Regras de negócio e dados (ex: UserModel.js)
│   ├── views/          # Templates de mensagens (ex: MenuView.js)
│   ├── config.js       # Configurações globais (Prefixo, Número do Dono)
│   └── index.js        # Ponto de entrada e gerenciador de conexão
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/niel00/WaBotMSG.git
   cd WaBotMSG
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Bot:**
   Certifique-se de ter o arquivo `src/config.js` configurado com as suas informações:
   ```javascript
   module.exports = {
       prefix: '!',
       numeroDono: '5511999999999@s.whatsapp.net' // Coloque seu número com DDI e DDD
   };
   ```

## ▶️ Como Rodar

Inicie o bot executando o arquivo principal:
```bash
node src/index.js
```
*Na primeira execução, um QR Code aparecerá no terminal. Abra o WhatsApp no seu celular, vá em "Aparelhos conectados" e escaneie o código.*

## 🤝 Contribuição
Sinta-se à vontade para fazer um *fork* do projeto e enviar melhorias através de *pull requests*.
