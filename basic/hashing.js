
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const password = 'Ilovecupcakes';
const secret = 'abcdefg';


const hash = crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');


console.log(`${password} -> SHA256 -> ${hash}`);


const hash2 = jwt.sign(password,secret);

console.log(`${password} -> Jwt -> ${hash2}`);



