const mongoose = require('mongoose');

//estrutura do seu model (atributos da sua entidade)
const passengersSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String },
    documentNumber: { type: String },
    travelId: { type: String }
}, {
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

// atribuindo o esquema a uma collection
// estou definindo o nome da collection que irei salvar no banco
const passengers = mongoose.model('passengers', passengersSchema);

// exportar o model para ser utilizado
module.exports = passengers;
