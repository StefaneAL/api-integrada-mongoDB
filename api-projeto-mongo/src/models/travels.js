const mongoose = require('mongoose');

//estrutura do seu model (atributos da sua entidade)
const travelsSchema = new mongoose.Schema({
    id: { type: String },
    durationPrediction: { type: String },
    stops: { type: String },
    destination: { type: Object },
    busInfos: { type: Object },
    driverInfos: { type: Object },
    passengersInfos: { type: Array }
}, {
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

travelsSchema.virtual('ticket').
    get(function () {
        return this.id + '-' + this.destination.local;
    }).
    set(function (v) {
        this.id = v.substr(0, v.indexOf('-'));
        this.destination.local = v.substr(v.indexOf('-') + 1);
    });

// atribuindo o esquema a uma collection
// estou definindo o nome da collection que irei salvar no banco
const travels = mongoose.model('travels', travelsSchema);

// exportar o model para ser utilizado
module.exports = travels;
