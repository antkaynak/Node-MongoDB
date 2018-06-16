const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/todo');
const {User} = require('./model/user');


const app = express();

const port = process.env.PORT || 8080;

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

app.get('/todos/:id', (req,res)=>{
    console.log('GET /todos/:id ', req.params);
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id is not valid');
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(400).send('Todo with the id not found ' + id);
        }
        res.status(200).send({todo});
    }, (err)=>{
        console.log('An error occurred fetching user with id'+ req.params.id+ ' \n', err);
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
    });
});

app.patch('/todos/:id', (req,res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id is not valid');
    }

    const body = _.pick(req.body, ['text','completed']); //only pick these fields
    if(_.isBoolean(body.completed) && body.completed){ 
        //update completedAt if the request says todo is completed
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,
    {
        //$set:{
        //text: body.text,
        //completed: body.completed,
        //completedAt: body.completedAt
        //}
        $set: body
    },{
        new:true
    }).then((todo)=>{
        if(!res){
            return res.status(404).send();
        }
        res.status(200).send({todo})
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });

});

app.delete('/todos/:id', (req,res)=>{
    console.log('DELETE /todos/:id', req.params);
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id is not valid.');
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(400).send('Todo with the id not found ' + id);
        }
        res.status(200).send({todo});
    }, (err)=>{
        console.log('An error occurred deleting user with id'+ req.params.id+ ' \n', err);
        res.status(400).send(err);
    })
});


app.post('/users/', (req,res)=>{
    const body = _.pick(req.body, ['email','password']);
    //const user = new User({
    //   email: body.email,
    //    password: body.password
    //});
    const user = new User(body);


    user.save()
    .then(()=>{
        return user.generateAuthToken();
    })
    .then((token)=>{
        res.header('x-auth', token).status(200).send(user);
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});


app.get('/users/me', authenticate, (req,res)=>{
    res.send(req.user);
});

app.listen(port, ()=>   {
    console.log(`Started on port: ${port}`);
});