const express = require('express'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors');
const knex = require('knex');

const register = require ('./controllers/register')
const signin = require ('./controllers/signin')
const profile = require ('./controllers/profile')
const image = require ('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'poojaravi',
    password : '',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express(); 

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin' , (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)});
//:id means we can enter anything 
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db )});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});

// hash function takes in a string and jumbles 
	// it up, if you do this again, everytime the has generated is different
	/*bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
	});*/

/* Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/

app.listen(3000, () =>{
	console.log('app is running on port 3000')
})

