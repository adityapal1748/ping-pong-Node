const PlayerStatus = require("../models/playerStatus");

exports.activePlayers = async (req, res) => {
    try {
        const joinedPlayers = await PlayerStatus.find({ hasJoined: true }, 'name playerId');
        res.status(200).json(joinedPlayers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving joined players', error });
    }

}