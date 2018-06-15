

const {mongoose} = require('../db/mongoose');

const User = mongoose.model('Todo', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {
    User
};
