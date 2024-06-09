const gameRoom = require("../models/gameRoom");
const PlayerStatus = require("../models/playerStatus");

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

exports.createGameRooms = async (req, res) => {
  try {
    // Fetch all players who have joined
    const players = await PlayerStatus.find({ hasJoined: true });

    // Check if the number of joined players is exactly 8
    if (players.length !== 8) {
      return res.status(400).json({ message: 'Exactly 8 players must join before creating game rooms.' });
    }

    // Shuffle players to create random pairs
    const shuffledPlayers = shuffle(players);
    const gameRooms = [];

    // Pair players and create game rooms
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      const newRoom = new gameRoom({
        roomId: `room-${i / 2 + 1}`,
        players: [shuffledPlayers[i].playerId, shuffledPlayers[i + 1].playerId],
        status: 'pending'
      });
      await newRoom.save();
      gameRooms.push(newRoom);

      // Notify each player of their game room and opponent
      const io = req.app.get('io');
      io.to(shuffledPlayers[i].playerId).emit('game-room-assigned', {
        roomId: newRoom.roomId,
        opponent: shuffledPlayers[i + 1].name,
        order: 'first'
      });
      io.to(shuffledPlayers[i + 1].playerId).emit('game-room-assigned', {
        roomId: newRoom.roomId,
        opponent: shuffledPlayers[i].name,
        order: 'second'
      });
    }

    res.status(200).json({ message: 'Game rooms created', gameRooms });
  } catch (error) {
    res.status(500).json({ message: 'Error creating game rooms', error });
  }
};
