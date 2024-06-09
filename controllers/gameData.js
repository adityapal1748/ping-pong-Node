const gameRoom = require("../models/gameRoom");


exports.getGameData = async (req, res) => {
  const { roomId } = req.params;
  try {
    const gameData = await gameRoom.findOne({ roomId }).populate('players', 'name');
    res.status(200).json(gameData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game data', error });
  }
};
