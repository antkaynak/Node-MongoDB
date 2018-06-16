
//const {mongoose} = require('../db/mongoose');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Schema = mongoose.Schema;
const userSchema =  new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            //validator:(value)=>{
            //    return validator.isEmail(value);
            //},
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        required:true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//overriding json conversion to hide secret data
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

//not using arrow function because we want to use 'this' keyword
userSchema.methods.generateAuthToken = function(){ 
    const user = this;
    const access = 'auth';
    const token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();

    //user.tokens.push({
    //    access,
    //    token
    //});

    user.tokens = user.tokens.concat([{access,token}]);

    return user.save().then(()=> token);  
};

 //static because we dont access this via a User object but directly User schema
userSchema.statics.findByToken = function(token){
    const User = this;
    let decoded = undefined;
    try{
        decoded = jwt.verify(token, 'abc123');
    }catch(err){
        //return new Promise((resolve,reject)=>{
        //    reject();
        //});
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

const User = mongoose.model('User', userSchema);



module.exports = {
    User
};
