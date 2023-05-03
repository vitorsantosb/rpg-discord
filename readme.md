# Miyuki Shiba Documentação

<p align="center">
  <img width="800" alt="b26fab25f90d161d81b679edbd5abd24-Full" src="https://www.caixinhaquantica.com.br/wp-content/uploads/2019/07/Capa-Arte-RPG-scaled.jpg">
</p>

## Sobre

Esse projeto é o escopo completo de uma aplicação em larga escala desenvolvido por Vitor Batista(eu), com o fim didático
de unir todos os meus conhecimentos na área de programação e desenvolvimento de jogos.

Tendo todos esses pontos em comum o projeto Miyuki Shiba é um projeto que tenho desenvolvido ao longo de 2 anos.

#### Qual o foco do projeto ?

O projeto Miyuki Shiba é de ser um bot que gerencia e cuida de de toda a dinâmica de um RPG de mesa deis da criação da
sessão até mesmo organização da estrutura do servidor para ocorrer diversos jogos dentro do mesmo servidor, o bot
conterá as seguintes interações.

###### Comandos

```markdown
    addSessionMember    -          Adicionar membro a uma sessão.
    bodyDice            -          Rolagem de dado de partes do corpo.
    createSession       -          Criação de uma sessão de até 5 pessoas.
    deleteSession       -          Deleta uma sessão existente caso seja o dono/administrador do bot.
    deleteUser          -          Remove um usuário do cadastro da aplicação.
    initSession         -          WORKING IN PROGRESS.
    joinSession         -          O membro do servidor entra em uma sessão de RPG.
    listSession         -          Retorna a lista de todas as sessões de existentes para o servidor presente.
    register            -          Registra um membro da servidor como um jogador ou mestrante do servidor
    removeSessionMember -          Remove um membro da guild de uma sessão.
    rolls               -          Rola um dado selecionado aleatoriamente.
    setGameMaster       -          Defini um membro do discord como GameMaster do RPG.
    setup               -          Configura o seu servidor automaticamente para que o bot possa ser utilizado.
```

###### Internacilização da aplicação

O bot conta com um sistema de regionalização, que consiste que ele responde de acordo com o idioma presente no discord.
Caso seu discord estaja em portugues, suas interações com o bot serão respondidas em portgues, caso esteja em qualquer
outro idioma será respondido pelo padrão en-us.

###### Integração com o navegador.

Miyuki será conecta com uma plataforma no navegador que o mestrante e os jogadores poderam optar entre usar as
ferramentas atravês do discord ou do navegador, sendo uma plataforma de auxilio principal para mestrar mesas online.
A pagina do navegador ainda não teve inicio somente a sua ideia.

- Funcionalidades
  - Pagina com a presenta de todas as sessões do servidor publicas e privadas que podem ser acessadas pelo navegador.
  - Pagina da sessão com um painel para o mestrante adicionar: itens, verificar inventário dos jogadores, verificar
    histórico de rolagem, dentre outras.
  - Outras funcionalidades ainda estão sendo planejadas...

### Primeiros passos ao adicionar o bot no servidor.

Em breve...

## Como executar

- Para instalação de todas as dependencias execute no terminal do vscode o comando ``npm install`` para instalar o
  pacote de dependencias da aplicação.
- Para a execução do projeto, em caso de modo **DESENVOLVEDOR** use o comando ``npm start`` para rodar em modo dev com
  acesso aos logs de requisição feitos atraves da API.

## Miyuki Shiba RPG Discord BOT Dependences

# Versões e dependencias instaladas

```json linesn
"body-parser":  1.20.1
"discord.js": 14.9.0
"dotenv": 16.0.3
"express": 4.18.2
"mongodb": 5.1.0
"morgan": 1.10.0
"nodemon": 2.0.20
```

Dependencias de Desenvolvimento.

```json lines
"eslint":     8.30.0
"jest": 29.4.3
"progress": 2.0.3
```

## CONFIGURAÇÕES PADRÕES

- Authorization: necessidade de uma senha ou deixar em branco em pro de realização de teste.
- ORIGIN: url de acesso a api, futuramente será necessario para acessa a API, por enquanto está GLOBAL qualquer link
  acessa(não é permanente).
- Variaveis da .env presentes no discord.

## HOSPEDAGEM

**dev-branch**.

### Funções a serem implementadas:

- Realizando a criação das rotas com os métodos:
  - METÓDOS: POST, DELETE, GET, PATCH.
  - METÓDOS: UPDATE, CREATE, DELETE, INSERT.

## Programas necessarios testa as conexões da API

- PostMan [link](https://www.postman.com/)

## Organograma do Projeto e Diagrama de risco

``STATE`` Organograma: 67% feito. Ultima atualização: 19/04/2023

``STATE`` Diagrama de Risco: Work in progress.

- Figma [Acesso](https://www.figma.com/file/wzWFzWOM97VCZXOIXYpFjQ/RPG-DISCORD?node-id=0%3A1&t=MBehTUBtHElr3Am7-1)

## Como funcionara a criação e inserção de novas rotas.

Primeiramente é necessario que você crie a pasta com o que a rota irar enviar/receber/realizar, realizando a criação da
pasta você ira criar a (nomeRota)Manager seguinte o exemplo abaixo:

```Js
const express = require("express");
const router = express.Router();

async function init() {
  //Função que recebe as importações de todas as rotas que a disponiveis que nossa PRODUCT pode realizar, 
  //sendo elas métodos GET, POST ou PATCH
  router.use(require("./get"));
}

module.exports = {router, init};
```

script: get.js

```js
const express = require("express");
const router = express.Router();

router.get("/products", (req, res, next) => {
  res.status(200).send({
    message: 'Usando o GET dentro da rota products'
  });
});
module.exports = router;
```

Atualizado em: ```data: 25/04/2023```

Escrito por: Vitor Batista da Conceição Santos


