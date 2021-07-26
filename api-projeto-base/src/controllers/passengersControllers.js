const travels = require("../models/travels.json");
const passengers = require("../models/passengers.json");
const fs = require("fs");
const utils = require("../utils/travelsUtils");

const getAllPassengers = (req, res) => {
    res.status(200).send(passengers);
};

const createPassenger = (req, res) => {
    let {
        name,
        email,
        documentNumber
    } = req.body;

    let requiredId = req.params.id;

    let passenger = {
        "id": Math.random().toString(32).substr(2),
        name,
        email,
        documentNumber,
        travelId: requiredId
    }

    const travelRequired = travels.find(t => t.id == requiredId); // achando a viagem solicitada na requisição

    travels.forEach((travel) => {
        let sameId = travel === travelRequired;
        // console.log(sameId);
        if (sameId) {
            // console.log(travel.id);
            travel.passengersInfos.push(passenger); // adicionando um passageiro à viagem solicitada
        };
    });

    passengers.push(passenger) // adicionando passageiro na lista de passageiros do sistema
    fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', () => { })
    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err }); //responder com o erro
        } else {
            console.log("Passageiro adicionado com sucesso!");
            res.status(200).send({
                "message": "Passageiro adicionado com sucesso!",
                travelRequired
            });
        };
    });
};

// substituir todo passageiro APESAR do método PUT ser usado para substituir apenas uma parte
const replacePassenger = (req, res) => {
    const requiredId = req.params.id;
    const {
        name,
        email,
        documentNumber
    } = req.body;

    // let passenger = passengers.find(p => p.id == requiredId);
    let filteredPassenger = utils.filterById(passengers, requiredId);
    // console.log('PASSENGER', passenger);

    const index = passengers.indexOf(filteredPassenger);
    // console.log('INDEX', index);

    let updatedPassenger = {
        id: requiredId,
        name,
        email,
        documentNumber
    };

    if (index >= 0) { // verifico se o passageiro existe
        // passageiro encontrado!
        passengers.splice(index, 1, updatedPassenger) // busco no array o passageiro, excluo o registro antigo e subtituo pelo novo
        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err }) // caso de erro retorno status 500
            } else {
                res.status(200).json([{
                    "mensagem": "Passageiro substituido no sistema com sucesso",
                    updatedPassenger
                }]);
            }
        })
    } else {
        //passageiro não encontrado
        res.status(404).send({ message: "Passageiro não encontrado para ser atualizado!" })
    }
};

// atualizar apenas o nome do passageiro
const updateName = (req, res) => {
    const requiredId = req.params.id;
    let newName = req.body.name;

    let filteredPassenger = utils.filterById(passengers, requiredId);

    if (filteredPassenger) {
        filteredPassenger.name = newName;

        //atualiza passageiro na base de passageiros
        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err }) // caso de erro retorno status 500
            } else {
                res.status(200).json([{
                    "mensagem": "Nome do passageiro atualizado com sucesso",
                    filteredPassenger
                }]);
            }
        })
    } else {
        res.status(404).send({ "message": "Passageiro não encontrado para ter nome atualizado!" })
    }
}

const deletePassenger = (req, res) => {
    const requiredId = req.params.id;

    let filteredPassenger = utils.filterById(passengers, requiredId);
    const index = passengers.indexOf(filteredPassenger);
    console.log("achei??")
    console.log(index)
    // deleta passageiro da base de passageiros
    if (index >= 0) {
        passengers.splice(index, 1)

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err }) // caso de erro retorno status 500
            } else {
                res.status(200).json([{
                    "mensagem": "Passageiro deletado",
                    passengers
                }]);
            };
        });
    } else {
        res.status(404).json({ mensagem: "Passageiro não encontrado para deletar!" });
    }
};

module.exports = {
    getAllPassengers,
    createPassenger,
    replacePassenger,
    updateName,
    deletePassenger
};