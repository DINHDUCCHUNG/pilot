const moongose = require("mongoose");

const PlayerSchema = new moongose.Schema({
    player: [String],
    score:[{body: Number}],
    round:[{body: Number}]
});
const playerInformation = moongose.model('Player',PlayerSchema);
module.exports = playerInformation;