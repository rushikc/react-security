const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const { auth } = require('./middleware/auth')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth')

const { User } = require('./modules/user');
app.use(bodyParser.json())
app.use(cookieParser());


app.post('/api/users',(req,res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(doc);
    })
})


app.post('/api/users/login',(req,res)=>{

    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) res.json({message:'Auth failed, user not found'})

        else{
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(err) throw err;
                if(!isMatch) return res.status(400).json({
                    message:'Wrong password'
                });
    
                res.status(200).send(isMatch)
            })

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).send('ok');
            })
        }

    })
})

 

app.get('/api/profile',auth,(req,res)=>{
    res.status(200).send(req.token);
})

 
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`started server at ${port}`);
    
})