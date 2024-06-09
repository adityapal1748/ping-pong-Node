// models/playerStatus.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerStatusSchema = new mongoose.Schema({
  playerId: {type:Schema.Types.ObjectId, required: true, unique: true},
  name: { type: String, required: true },
  hasJoined: { type: Boolean, default: false }
});

const PlayerStatus = mongoose.model('PlayerStatus', playerStatusSchema);

module.exports = PlayerStatus;
