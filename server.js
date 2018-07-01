const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');




const db = knex({
	client: 'pg',
	connection: {
		host : 'YOUR_HOST_PORT',
		user : 'YOUR_DATABASE_USER',
		password : 'YOUR_DATABASE_PASSWORD',
		database : 'YOUR_DATATBASE_NAME'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.get('/' , (req, res) => {
	res.send(database.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
app.listen(5000, () => {
	console.log("app is running on port 5000")
})


