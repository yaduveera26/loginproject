const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port =process.env.PORT|| 5000;

app.set('view engine','ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost/loginp',{useNewUrlParser: true , useUnifiedTopology: true});
let db = mongoose.connection;
let user = require('./models/userdata');
db.once('open',()=>{
    console.log('database connected');
});

db.on('error',(err)=>{
  console.log(err);
});

app.get('/',(req,res)=>{
  res.render('index');
});

app.get('/register',(req,res)=>{
  res.render('register');
});

app.post('/register',(req,res)=>{
  let User = new user();
  User.email = req.body.email;
  User.username = req.body.username;
  User.password = req.body.password;
  User.save((err)=>{
    if(err)
    console.log(err);
    else {
      res.render('login');
    }
  })
});

app.get('/login',(req,res)=>{
  res.render('login');
});

app.post('/login',(req,res)=>{
  let username = req.body.username;
  let password = req.body.password;
  user.findOne({username:username},function(err,user){
    if(user)
    {
      if(user.password === password)
      res.render('userdash',{user:user});
      else {
        res.send('wrong password');
      }
    }
    else{
    res.render('register');
  }
  });
});

app.listen(port,()=>{
  console.log(`server started at ${port}`);
}) ;
