<h1 align="center"> API REST </h1>

<p align="center">
  <img width="800" alt="b26fab25f90d161d81b679edbd5abd24-Full" src="https://user-images.githubusercontent.com/42703631/186601033-c73a903a-17d1-475c-a3cb-620d58e51f56.png">
</p>


## Sobre
- Api que irar conectar nosso website com a aplicação do discord.

Escrito por: Vitor Batista da Conceição Santos

## Como executar
  - Para instalação de todas as dependencias execute no terminal do vscode o comando ``npm install`` para instalar o pacote de dependencias da aplicação.
  - Para a execução do projeto, em caso de modo **DESENVOLVEDOR** use o comando ``npm start`` para rodar em modo dev com acesso aos logs de requisição feitos atraves da API.
  
## CONFIGURAÇÕES PADRÕES
  - Authorization: necessidade de uma senha ou deixar em branco em pro de realização de teste.
  - ORIGIN: url de acesso a api, futuramente será necessario para acessa a API, por enquanto está GLOBAL qualquer link acessa(não é permanente).
  - Variaveis da .env presentes no discord.
  
## HOSPEDAGEM
  
  **dev-branch**.

 ### Funções a serem implementadas:
- Realizando a criação das rotas com os métodos: 
    - METÓDOS: POST, DELETE, GET, PATCH.
- Criação e implementação da Database com os metódos:
    - METÓDOS: UPDATE, CREATE, DELETE, INSERT.
    
## Programas necessarios para programar na API e manusear a database.
  - PostMan [link](https://www.postman.com/)
  - MySql Workbanch [link](https://www.mysql.com/)


## Como criar uma Rota e adicionar ela a lista de Rotas.

  Primeiramente é necessario que você crie a pasta com o que a rota irar enviar/receber/realizar, realizando a criação da pasta você ira criar a (nomeRota)Manager seguinte o exemplo abaixo:
  

```Js
const express = require("express");
const router = express.Router();

async function init() {
    //Função que recebe as importações de todas as rotas que a disponiveis que nossa PRODUCT pode realizar, 
    //sendo elas métodos GET, POST ou PATCH
    router.use(require("./get"));
}
module.exports = { router, init };
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
