
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {ObjectID} = require('mongodb');



const id = '5b23a53dc8fdce20102eade4';

if(!ObjectID.isValid(id)){
    return console.log('Id is not valid.');
}   

Todo.find({
    _id: id //dont need to use ObjectID with mongoose
}).then((todos)=> console.log(todos), (err)=> console.log(err));


Todo.findOne({
    _id: id 
}).then((todo)=> console.log(todo), (err)=> console.log(err));

Todo.findById(id).then((todo)=> {
    if(!todo){
    console.log('Id does not exist');
    }
    console.log(todo)
}, (err)=> console.log(err));
