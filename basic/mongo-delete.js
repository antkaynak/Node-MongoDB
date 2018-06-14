
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
    if(err){
        return console.log(err);
    }
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    db.collection('Todos')
    .deleteMany({text:'Something'})
    .then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    });

    //deletes the first one it finds
    db.collection('Todos')
    .deleteOne({text:'Something'})
    .then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    });


    //deletes and returns the deleted object
    db.collection('Todos')
    .findOneAndDelete({text:'Something'})
    .then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    });

    client.close();

});