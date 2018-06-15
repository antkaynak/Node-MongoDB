
//const {mongoose} = require('../db/mongoose');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
}));

module.exports = {
    User
};
