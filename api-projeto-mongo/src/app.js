const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//String de conexao
mongoose.connect("mongodb://localhost:27017/reprograma-trip", { // no nosso caso nao temos usuario e senha, mas caso tivessemos poderiamos seguir esse formato: mongodb://username:password@localhost:27017/reprograma-trip
    useNewUrlParser: true, // define que vai utilizar a nova url parse da string de conexao
    useUnifiedTopology: true // define que vai utilizar o novo mecanismo de gerenciamento de conexao do driver do mongodb
});

// Caso tenha algum problema com sua base de dados que nao tenha conseguido rodar o mongo na maquina, pode usar o banco virtual abaixo
// So descomentar o codigo abaixo e comentar o correspondente acima
/*
mongoose.connect("mongodb://alunareprograma:reprograma12@cluster0-shard-00-00.kuokc.mongodb.net:27017,cluster0-shard-00-01.kuokc.mongodb.net:27017,cluster0-shard-00-02.kuokc.mongodb.net:27017/reprograma-trip?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true, // define que vai utilizar a nova url parse da string de conexao
    useUnifiedTopology: true // define que vai utilizar o novo mecanismo de gerenciamento de conexao do driver do mongodb
});
*/

//Conexao com o mongo
let db = mongoose.connection;

//Captura de erro ou sucesso na conexão
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
    console.log("conexão feita com sucesso.")
})

//Rotas
const travelsRoutes = require("./routes/travelsRoutes");

app.use(cors());
app.use(express.json());
app.use("/", travelsRoutes);

module.exports = app;