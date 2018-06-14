
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
    if(err){
        return console.log(err);
    }
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    db.collection('Todos')
    .findOneAndUpdate(
        {
            _id: new ObjectID('5b227b05cc4a593578c658a3')
        },
        {
            $set:{
                completed:true
            }
        },
        {
            returnOriginal:false
        }
    ).then((result)=>{
        console.log(result);
    });

    client.close();

});