const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const message = mongoose.model('message', messageSchema);

module.exports = {
    message
}