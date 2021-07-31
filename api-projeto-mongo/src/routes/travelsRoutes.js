const express = require("express");
const router = express.Router();

const travelsController = require("../controllers/travelsControllers");
const passengersController = require("../controllers/passengersControllers");

// VIAGENS
router.post("/travels/", travelsController.createTravel); // rota nova
router.delete("/travels/:id", travelsController.deleteTravel); // rota nova
router.get("/travels/", travelsController.getAllTravels); // lista todas as viagens
router.get("/travels/:id", travelsController.getTravelById); // busca uma viagem pelo id
router.post("/travels/:id/passenger/create", passengersController.createPassenger); // cria um novo passageiro em uma viagem

// PASSAGEIROS
router.get("/passengers", passengersController.getAllPassengers); // recupera todos os passageiros
router.delete("/passengers/:id", passengersController.deletePassenger); // deleta um passageiro por id
router.put("/passengers/:id", passengersController.replacePassenger); // altera dados do passageiro por id
router.patch("/passengers/updateName/:id", passengersController.updateName); // altera o nome de um passageiro por id

module.exports = router;