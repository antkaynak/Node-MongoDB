
//const {mongoose} = require('../db/mongoose');
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const Todo = mongoose.model('Todo', new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
}));


module.exports = {
    Todo
}
