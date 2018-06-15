const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/todo');
const {User} = require('./model/user');


const app = express();


app.listen(8080, ()=>{
    console.log('Started on port 8080');
});