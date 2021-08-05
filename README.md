
# Esse é um exercício de integração de Banco de dados usando MongoDB 
 
## A ideia é criar um `CRUD` completo usando o banco de dados do mongoDB
 
### O passo a passo foi o seguinte :
 
* Primeiro iniciei o comando `mongod` no `cmd`  e deixei o servidor rodando .
* Agora já no Robo3t criei um `DB` com o nome `treino`e uma collection com o nome `games` e inseri todos os documentos na collection .
 
* No `Git Bash` eu abri a pasta referente a `API`  de `games`,  usei o comando `npm i` para instalar tudo que já tinha no meu arquivo `packege.json` , usei o comando `npm i cors --seva` para instalar o cors e salvar no `packege.json` por último usei o comando  `npm i mongoose` para instalar o Mongoose  que é um módulo do NodeJS desenvolvido para conectar-se ao MongoDB.
 
* Agora no `VScode` dentro da pasta `models` criei um arquivo `games.js` e dentro dele fiz a requisição para o `mongoose` e criei o `Schema` do meu documento de `game` com a formatação 
 
```javascript
    id: {type: Number},
    title: {type: String},
    launchYear: {type: String},
    consoles: {type: Array},
    liked: {type: Boolean},
    stages: {type: Array}
```
* atribuí o Schema ao banco de dados e exportei.
 
* agora no app.js já com ```const express = require("express")
const app = express()```  criados eu adicionei os comandos  ```const cors = require("cors");
const mongoose = require("mongoose");```  adicionei a rota apontando para o `DB` `treino`
 
* Ainda no `app.js` criei uma `let db = mongoose.connection;`  para gerar a conexão com o mongo. no final meu `app.js` ficou assim  
```javascript
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
 
const app = express();
 
mongoose.connect("mongodb://localhost:27017/treino"),{
    useNewUrlParser: true,
    useUnifiedTopology: true
};
 
let db = mongoose.connection
 
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function(){
    console.log("conexão feita com sucesso.")
});
 
const gameRoutes = require("./routes/games");
 
app.use(express.json());
 
app.use("/games", gameRoutes)
 
module.exports = app
```
## Agora vamos construir os `controllers`
<img src="https://media.giphy.com/media/xTiTnolgxvZcJwdq4E/giphy.gif" width="600" height="200" />
 
* ###  Comecei pelo `{GET}` onde eu pego todos os jogos:
 
```javascript
const getAllGames = (req, res) => {
 
    games.find(function(err, gameFound){
        if(err){
            res.status(500).send({message: err.message})
        }
        if(gameFound && gameFound){
            res.status(200).send(gameFound)
        }else{
            res.stages(204).send();
        }
    })
 
 
```
 testei no `Postman` e passou
 
<img src="https://media.giphy.com/media/3gM1liq7Eetk4/giphy.gif" width="200" height="150"/>
 
---
 
* ### Já que o primeiro `{GET}` passou fiz o segundo 
 
```javascript
const getGame = (req, res) => {
    const gameId = req.params.id
 
    games.findOne({id: gameId},function (err, gameFound){
        if(err){
            res.status(500).send({message: err.message});
        }else{
           if(gameFound){
               res.status(200).send(gameFound);
           }else{
               res.status(204).send({ message: "Game não encontrado" });
           }
        }
    })
}
```
 
---
 
* ### `{GET}` é fácil quero ver fazer um `{POST}`
```javascript
const createGame = (req, res) => {
    const { 
        id, 
        title, 
        launchYear, 
        consoles,  
        liked,
        stages 
    } = req.body
 
 
    let newGame = new games({ 
        id, 
        title, 
        launchYear, 
        consoles,  
        liked,
        stages 
    })
    
    newGame.save(function(err){
        if(err){
            res.status(500).send({message: err.message})
        }else{
            res.status(201).send("Jogo adicionado com sucesso!")
        }
        
    })
}
```
 testei no `Postman` e passou
 
 <img src="https://media.giphy.com/media/uxLVaMUiycgpO/giphy.gif" width="200" height="150"/>
 
---
 
* ## Achei que o `{DELETE}` não passaria... mas passou 
 
 <img src="https://media.giphy.com/media/l0K4kyjjU7DRGcaVG/giphy.gif" width="200" height="150"/>
 
```javascript
const deleteGame = (req, res) => {
    const gameId = req.params.id
    games.findOne({ id: gameId }, function(err,gameFound){
        if(err){
            res.status(500).send({message: err.message})
        }else{
            if(gameFound){
                games.deleteOne({id: gameId}, function(err){
                    if(err){
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    }else{
                        res.status(200).send({
                            message: "Jogo removido com sucesso",
                            status: "SUCCESS"
                        })
 
                    }
                })
            }else{
                res.status(404).send({
                    message: "Não há jogo para ser removido com esse id"
                })
            }
        }
 
    })
```
 
---
 
* ### E o `{PUT}` ?..
 
```javascript
const updateGame = (req, res) => {
    const gameId = req.params.id
    games.findOne({id: gameId}, function(err,gameFound){
        if(err){
            res.status(500).send({
                message: err.message
            })
        }else{
            if(gameFound){
                games.updateOne(
                    {id: gameId},
                    {$set: req.body},
                    function(err){
                        if(err){
                            res.status(500).send({
                                message: err.message
                            })  
                        }else{
                            res.status(200).send({
                                message: "Campo alterado com sucesso"
                            })
                        }
                    })
            }else{
                res.status(404).send({
                    message: "Game não encontrado para ser atualizado"
                })
            }
        }
    })
}
```
     
 
* ### Por ultimo, porem não menos importante, o `{PATCH}` 
    *que deu uma dorzinha de cabeça mas eu consegui um socorro nos fóruns da vida*
 
```javascript
const updateLiked = (req, res) => {
    const gameId = req.params.id
    let likedReq = req.body.liked
 
    games.findOne(
        {id:gameId}, 
        function(err, gameFound){
            if(err){
                res.status(500).send({
                    message: err.message
                })
            }else{
                if(gameFound){
                    games.updateOne(
                        {id: gameId},
                        {$set: {liked: likedReq}},
                        function(err){
                            if(err){
                                res.status(500).send({
                                    message: err.message
                                })
                            }else{
                                res.status(200).send({
                                    message: "Arquivo atualizado com sucesso!"
                                })
                            }
                           
                        }
                    )   
                }else{
                    res.status(404).send({
                        message: "Game não encontrado para registrar o like."
                    })
                }
            }
        }
    )
}
```
 
---
 
## Tudo rodando e funcionando perfeitamente com o MongoDB!
## O que eu achei dessa jornada ?
 
<img src="https://media.giphy.com/media/n8SkNR77udWlG/giphy.gif" width="480" height="333"/>
 
*Ps: mantive os arquivos de música e pets para treinar*
 


