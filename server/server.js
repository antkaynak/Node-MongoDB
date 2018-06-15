
const {mongoose} = require('./db/mongoose');



const newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then(
    (doc)=>{
    console.log('Saved todo', doc)
    }, 
    (err)=>{
    console.log('An error occurred. ', err)
});
