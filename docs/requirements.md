# Documento de Requisitos - WaBotMSG

## 1. Visão Geral do Projeto
O objetivo deste projeto é desenvolver um assistente virtual (Bot) para o WhatsApp capaz de ler mensagens recebidas, interpretar intenções básicas e responder automaticamente de forma instantânea. O sistema é construído sobre o ecossistema Node.js, utilizando a biblioteca Baileys para conexão via WebSockets, e adota o padrão arquitetural MVC (Model-View-Controller) para garantir manutenibilidade e escalabilidade.

## 2. Requisitos Funcionais (RF)
*O que o sistema DEVE fazer ativamente.*

*   **RF01 - Autenticação:** O sistema deve gerar e exibir um QR Code no terminal para o primeiro acesso.
*   **RF02 - Persistência de Sessão:** O sistema deve salvar localmente os tokens e credenciais de acesso na pasta `auth_info_baileys` para dispensar a leitura do QR Code em acessos subsequentes.
*   **RF03 - Escuta de Mensagens:** O sistema deve monitorar e capturar mensagens de texto recebidas em tempo real.
*   **RF04 - Filtro de Mensagens:** O sistema deve ignorar mensagens originadas pelo próprio número do bot (para evitar loops) e mensagens de sistema (como atualizações de status).
*   **RF05 - Roteamento de Comandos:** O sistema deve interpretar palavras-chave (ex: "oi", "ping") enviadas pelo usuário, independentemente de estarem em maiúsculas ou minúsculas.
*   **RF06 - Respostas Automáticas:** O sistema deve enviar textos formatados de volta ao remetente com base na intenção interpretada.

## 3. Requisitos Não Funcionais (RNF)
*Como o sistema deve se comportar (restrições e tecnologias).*

*   **RNF01 - Stack Tecnológica:** A aplicação deve ser desenvolvida em **JavaScript** e executada em ambiente **Node.js**.
*   **RNF02 - Biblioteca Base:** A comunicação com os servidores da Meta deve ser feita exclusivamente pela biblioteca não-oficial `@whiskeysockets/baileys`.
*   **RNF03 - Arquitetura Padrão:** O código-fonte deve ser estruturado no padrão **MVC (Model-View-Controller)**, garantindo a separação entre regra de dados, interface de texto e orquestração.
*   **RNF04 - Resiliência e Reconexão:** Em caso de queda de internet ou fechamento inesperado de socket, o sistema deve tentar a reconexão automaticamente. Apenas em caso de *Logout* explícito via aparelho celular a reconexão deve ser abortada.
*   **RNF05 - Gerenciamento de Logs:** O excesso de logs da biblioteca base deve ser suprimido utilizando a biblioteca `pino`, exibindo apenas informações cruciais de status e erros de conexão.

## 4. Regras de Negócio (RN)
*As leis que governam como os dados são tratados.*

*   **RN01 - Classificação de Usuário (Model):** O sistema deve ser capaz de identificar níveis de permissão ou status de usuários (ex: Cliente VIP vs. Cliente Normal) através do seu número (Jid).
*   **RN02 - Isolamento de Textos (View):** Nenhuma resposta de texto final (strings formatadas que o cliente lê) deve ser programada diretamente no Controlador. Todos os textos devem ser originados da camada de View.

## 5. Arquitetura de Pastas (Estrutura Física)
```text
/
├── auth_info_baileys/          # (Ignorado no Git) Tokens de sessão
├── src/
│   ├── controllers/            # Lógica de roteamento e orquestração
│   │   └── MessageController.js
│   ├── models/                 # Regras de negócio e (futuro) banco de dados
│   │   └── UserModel.js
│   ├── views/                  # Templates de mensagens de resposta
│   │   └── MessageView.js
│   └── index.js                # Arquivo principal: Setup de conexão e eventos
├── package.json                # Dependências do projeto (npm)
└── REQUIREMENTS.md             # Este documento
```