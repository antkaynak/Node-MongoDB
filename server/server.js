const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/todo');
const {User} = require('./model/user');


const app = express();

//use express middleware to convert user data JSON with library body parser
app.use(bodyParser.json());

app.get('/todos', (req,res)=>{
    console.log('GET /todos');
    Todo.find().then((doc)=>{
        res.send({todos:doc, status: 200});
    }, (err)=>{
        res.status(400).send(err);
    });
});

app.post('/todos', (req,res)=>{
    console.log(req.body);
    const todo = new Todo({
        text: req.body != null ? req.body.text : null
    });

    todo.save().then((doc)=>{
        res.status(200).send(`Todo saved. ${doc}`);
    }, (err)=>{
        console.log('An error occurred. ',err);
        res.status(400).send(`An error occurred. ${err}`);
    })
});


app.listen(8080, ()=>   {
    console.log('Started on port 8080');
});