
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
    if(err){
        return console.log(err);
    }
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    db.collection('Todos')
    //.find({completed:false})
    .find({_id: new ObjectID('5b226c220fa2412bd073c07b')})
    .toArray() //promise
    .then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log(err);
    });


    db.collection('Todos')
    .find()
    .count()
    .then((count)=>{
        console.log(count);
    },(err)=>{
        console.log(err);
    });

    client.close();

});