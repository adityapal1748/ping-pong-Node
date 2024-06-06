require('dotenv').config();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Player = require('../models/player'); 
const AdminKey = require('../models/adminkey');

exports.login = async (req, res) => {
    try {
        const { name, password, adminKey: providedAdminKey } = req.body;
        // if(!providedAdminKey){
        //     return res.status(400).json({ error: 'Admin has not loggedin yet' });
        // }
        const player = await Player.findOne({ name });

        if (!player) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (player.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // If the player is not an admin, validate the provided admin key
        if (player.role !== 'admin') {
            const latestAdminKey = await AdminKey.findOne().sort({ createdAt: -1 });
            if (!latestAdminKey || providedAdminKey !== latestAdminKey.key) {
                return res.status(400).json({ error: 'Invalid admin key' });
            }
        }

        // Create and sign a JWT token
        const token = jwt.sign({ id: player._id, role: player.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Get the socket.io instance from the app
        const io = req.app.get('socketio');

        // Emit an event when a player joins
        

        // If the player is an admin, generate and store a new admin key
        if (player.role === 'admin') {
            const newAdminKey = uuidv4(); // Generate a unique admin key
            await AdminKey.create({ key: newAdminKey }); // Save the new admin key to the database
            io.emit('newAdminKey', { adminKey: newAdminKey, name: player.name });
        }else{
            io.emit('playerJoined', { id: player._id, name: player.name });
        }

        // Return the token and role
        res.json({
            token,
            role: player.role
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
