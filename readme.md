# DiscordBOT-base (NodeJS)
A base to build your own discord bot. We have support for event handler and command handler.

# Setting up

Later you need to edit the `.env` file and add your discord bot token and setup your mysql connection. Just copy `example.env` and place your login details.

You need to setup project, thats will install all dependencies to run the bot.
```
npm install
```


#
# DISCORD BOT - README
#

# rpg-discord-bot
- Para rodar o projeto (hot reload): `npm run dev`
- Para rodar o projeto (produção): `npm run start`

# Versões e dependencias instaladas
  - Discord version: 12.5.3
    - `npm install discord.js 12.5.3`
  -Node version: v14.17.0
    - link de acesso: "https://nodejs.org/en/download/"

# Discord RPG
 A base de nosso projeto e criar uma estrutura de código auto o suficiente e bem setorizado, ou seja criar um código que seja de facil manuntenção e grande modularidade.

 # Ferramentas de Organização
  -Organização de Atividades
    - https://www.taskade.com/invites/T7yEAFxUej1vKbRj
  - Design WEB
    - https://www.figma.com/

# Layout base da programação
  - https://github.com/yLost/DiscordBOT-base (Sugestão de Lost)

# Mudanças e coisas a serem discutidas
  - Reformulação dos comandos no bot;
    - Criar uma ficha - (!creatUser (nome do personagem))
    - Deleta uma ficha -(!deletUser (nome do personagem))
    - Definir Mestrante's -(!setGameMaster @mention)
    - Informação de usuário -(!userInfo @usermention)
    - Rolagem de dados - (!roll d(Qualquer valor entre 2 e 100))
    - Rolagem de multiplos dados - (!roll XdV(sendo X a quantidade de dados e V a quantidade de lados))
    - Rolagem de dados de corpo - (!roll body(braços, pernas, cabeça e etc))
    - Registra uma mesa de rpg - (!creatTable (nome da mesa))
    - Demais comandos a serem discutidos.

  - Criar um design de mensagens embed no discord.
  - Sistema de criação de cargos(Definir o mestrante e jogadores);

# Banco de Dados
  - Vincular todos os nossos dados (Guild ID, USER ID - dentre outros) a um banco de dados;
    - Escolher um BD a ser utilizado mySQl ou PostgreSQL
    - Criar tratamento de dados.
    - Sistema de backup automatico(semanal).

  - Outras coisas vão sendo discutidas com o decorrer do projeto;

# Interface Web do bot
 - Criar pagina web contendo
    Pagina web que ira conter toda a interface para o mestrante e jogador durante uma mesa do rpg podendo ser editada em tempo real.
    - pagina para ficha do personagem do usúario somente podendo ver ele e o mestrante
      - Foto do personagem
      - Foto do usuario + ID 
      - Nome do servidor em que a ficha está salva
      - Ficha do personagem contendo
        - Vida
        - Estamina
        - Dinheiro
        - Experiencia
        - Atributos de ficha
           -Constituição
           -destresa
           -sabedoria 
           -percepção 
           -inteligencia
           -carisma;
        - outros recursos extras que podem ser colocados para revisar depois.
# Informações extras
  - Demais coisas vamos discutindo
  

