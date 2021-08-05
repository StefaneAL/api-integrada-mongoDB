const games = require("../models/games");


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

//ok
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
}

//ok
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

//PATH
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
   
//ok
const getAllGames = (req, res) => {

    games.find(function(err, gameFound){
        if(err){
            res.status(500).send({message: err.message})
        }
        if(gameFound && gameFound){
            res.status(200).send(gameFound)
        }else{
            res.status(204).send();
        }
    })

}

// ok
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

module.exports = {
    createGame,
    deleteGame,
    updateLiked,
    updateGame,
    getAllGames,
    getGame,
}