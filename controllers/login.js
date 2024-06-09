require('dotenv').config();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Player = require('../models/player');
const AdminKey = require('../models/adminkey');
const errorResponse = require('../utils/httpErrorHandler');
const successResponse = require('../utils/httpResponseHandler');
const PlayerStatus = require('../models/playerStatus');

exports.login = async (req, res) => {
    try {
        const { name, password, adminKey: providedAdminKey } = req.body;

        const player = await Player.findOne({ name });

        if (!player) {
            return errorResponse(res, new Error('Invalid credentials'), 400);
        }

        if (player.password !== password) {
            return errorResponse(res, new Error('Invalid credentials'), 400);
        }

        // If the player is not an admin, validate the provided admin key
        if (player.role !== 'admin') {
            const latestAdminKey = await AdminKey.findOne().sort({ createdAt: -1 });
            if (!latestAdminKey || providedAdminKey !== latestAdminKey.key) {
                return errorResponse(res, new Error('Admin is yet to join the game'), 400);
            }
        }

        // Create and sign a JWT token
        const token = jwt.sign({ id: player._id, role: player.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Get the socket.io instance from the app
        const io = req.app.get('socketio');

        // Emit an event when a player joins
        
        if (player.role === 'admin') {
            const newAdminKey = uuidv4(); // Generate a unique admin key
            await AdminKey.create({ key: newAdminKey }); // Save the new admin key to the database
            io.emit('newAdminKey', { adminKey: newAdminKey, name: player.name });
        } else {
            io.emit('playerJoined', { id: player._id, name: player.name,ready:false });
            await PlayerStatus.updateOne(
                {"playerId": player._id },
                { $set: { hasJoined: true, name } },
                { upsert: true }
            );
        }
        

        // Return the token and role using the success handler
        return successResponse(res, { token, role: player.role,id:player._id }, 'Login successful');
    } catch (err) {
        return errorResponse(res, err);
    }
};
