
const {User} = require('./../model/user');

const authenticate = (req,res,next)=>{
    const token = req.header('x-auth');

    User.findByToken(token)
    .then((user)=>{
        if(!user){
           // return res.status(401).send();
           return Promise.reject();
        }
 
        //res.status(200).send(user);
        req.user = user;
        req.token = token;
        next();
    }).catch((err)=>{
        res.status(401).send();
    });
}

module.exports = {authenticate};
