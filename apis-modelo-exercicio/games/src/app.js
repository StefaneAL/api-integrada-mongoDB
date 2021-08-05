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

const gameRoutes = require("./routes/gamesRoutes");

app.use(express.json());

app.use("/games", gameRoutes)

module.exports = app