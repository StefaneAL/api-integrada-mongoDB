const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    id: {type: Number},
    title: {type: String},
    launchYear: {type: String},
    consoles: {type: Array},
    liked: {type: Boolean},
    stages: {type: Array}
},{
    versionKey: false
});

const games = mongoose.model("games", gameSchema);

module.exports = games;