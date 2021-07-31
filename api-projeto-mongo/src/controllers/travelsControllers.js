const travels = require("../models/travels");

const createTravel = (req, res) => {
    let travel = new travels(req.body)
    travel.save(function (err) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(201).send(travel.toJSON({ virtuals: true }))
        }
    })
}

const deleteTravel = (req, res) => {
    const requiredId = req.params.id;
    travels.findOne({ id: requiredId }, function (err, travel) {
        if (travel) {
            //deleteMany remove mais de um registro
            //deleteOne remove apenas um registro
            travel.deleteOne({ id: requiredId }, function (err) {
                if (err) {
                    res.status(500).send({
                        message: err.message,
                        status: "FAIL"
                    })
                } else {
                    res.status(200).send({
                        message: 'Viagem removida com sucesso',
                        status: "SUCCESS"
                    })
                }
            })
        } else {
            res.status(404).send({ message: 'Não há viagem para ser removida com esse id' })
        }
    })
}

const getAllTravels = (req, res) => {
    //Find sempre retorna uma lista
    travels.find(function (err, travelsFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (travelsFound && travelsFound.length > 0) {
                res.status(200).send(travelsFound);
            } else {
                res.status(204).send();
            }
        }
    })
};

const getTravelById = (req, res) => {
    const resquestId = req.params.id;
    //FindOne retorna um unico documento
    travels.findOne({ id: resquestId }, function (err, travelFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (travelFound) {
                res.status(200).send(travelFound.toJSON({ virtuals: true }));
            } else {
                res.status(204).send();
            }
        }
    })
};


module.exports = {
    createTravel,
    deleteTravel,
    getAllTravels,
    getTravelById
}