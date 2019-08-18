const jwt = require('jsonwebtoken');


const id = '1000';

const secret = 'supersecret';


const receivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';
// const token = jwt.sign(id,secret);
const decodeToken = jwt.verify(receivedToken,secret)
console.log(decodeToken);
