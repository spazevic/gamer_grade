//require enviornment varibles
require('dotenv').config()

//require node modules
let passport = require('passport')

//require any strategies (AKA types of auth) we want to use
let LocalStrategy = require('passport-local').Strategy

//impport a reference to our database 
let db = require('../models')

//Serializtaion and Deserialization functions
//There are for passport to use in order to store/lookup the user info
//SERIALIZE: Reduce a usr object to just its id field
passport.serializeUser((user, done) => {
	//call the callback function with the user id as argument
	//done(error, id) - pass a null if no error
	done(null, user.id)
})

//DESERIALIZE: reverse process of serialize function
//In other words, take a user's ID and return the full user object
passport.deserializeUser((id, done) => {
	db.user.findByPk(id)
	.then(user => {
		done(null, user)
	})
	.catch(done)
})

//LOCAL STRATEGY: Using a database that we manage ourselves
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'

}, (email, password, done) => {
	//Try looking uo the user by their email
	db.user.findOne({
		where: {email: email }
	})
	.then(foundUser => {
		//check if there is a user, if yes check password
		if(foundUser && foundUser.validPassword(password)) {
			//good user exists and password is correct
			done(null, foundUser)
		} else {
			//bad - user doesnt exists or had a bad password
			done(null, null)
		}
	})
	.catch(done)
}))

module.exports = passport