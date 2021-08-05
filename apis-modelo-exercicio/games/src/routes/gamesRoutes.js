const express = require("express")
const router = express.Router()
const controller = require("../controllers/gamesController")

router.post("/create", controller.createGame);

router.delete("/:id/del", controller.deleteGame)

router.put("/:id/update", controller.updateGame)
router.patch("/:id/liked", controller.updateLiked)

router.get("/", controller.getAllGames)
router.get("/:id", controller.getGame)

module.exports = router;
