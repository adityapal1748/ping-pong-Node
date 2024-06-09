const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }, 
  role: { type: String, default: 'player' },
  defense_length: { type: Number, required: true },
  player_id:{type:Number,required:true}
});

const Player = mongoose.model('Player', playerSchema,'Player');

module.exports = Player;
