const mongoose = require('mongoose');

const adminKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: '1h', // Optional: automatically delete the document after 1 hour
        default: Date.now
    }
});

const AdminKey = mongoose.model('AdminKey', adminKeySchema);

module.exports = AdminKey;
