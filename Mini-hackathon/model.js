const moongose = require("mongoose");

const PlayerSchema = new moongose.Schema({
    player: [String],
    round:[Array]
});
const playerInformation = moongose.model('Player',PlayerSchema);
module.exports = playerInformation;