const mongoose = require('mongoose');

const GameRoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  status: { type: String, default: 'pending' },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
});

module.exports = mongoose.model('GameRoom', GameRoomSchema);
