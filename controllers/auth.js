//Node modules/Varibles
let router = require('express').Router();
let db = require('../models')
let passport = require('../config/passportConfig')

//routes
router.get('/login', (req,res) => {
	res.render('auth/login')
});

//POST /auth/login - this is where login form pstst to
router.post('/login', passport.authenticate('local', {
	successFlash: 'Succesful Login- bada bing bada boom',
	successRedirect: '/profile/user',
	failureFlash: 'Invalid credentials',
	failureRedirect: '/auth/login'
}))

router.get('/signup', (req,res) => {
	res.render('auth/signup', {data: {}})
});

router.post('/signup', (req,res, next) => {
	if (req.body.password != req.body.password_verify) {
		//send a message on why things didn't work
		req.flash('error', 'Passwords do not match')

		res.render('auth/signup', {data: req.body, alerts: req.flash()})
	} else {
		//passwords matched, so now we'll findOrCreate by using email provided
		db.user.findOrCreate({
			where: {email: req.body.email}, 
			defaults: req.body
		})
		.then(([user, wasCreated]) => {
			if (wasCreated) {
				//new user
				//automatically login
				passport.authenticate('local', {
				successFlash: 'Succesful Login- suh bruh',
				successRedirect: '/profile/user',
				failureFlash: 'Invalid credentials',
				failureRedirect: '/auth/login'
				})(req, res, next)
			} else {
				//person already ahd account
				req.flash('error', 'Account already exits')
				res.redirect('/auth/login')
			}
		})
		.catch(err => {
			console.log('error creating a surver', err)

			//check fordequeliez validation errors
			if (err.errors) {
				err.errors.forEach(e => {
					if (e.type == 'Validation error') {
						req.flash('error', e.message)
					}
				})
				res.render('auth/signup', {data: req.body, alerts: req.flash()})
				
			} else {
				req.flash('error', 'Server error')
				//generic flash message for any other issue
			}
			res.redirect('/auth/signup')
		})
	}
	
})

router.get('/logout', (req,res) => {
	//remove user sdata from session
	req.logout()
	req.flash('success', 'Cya Nerd')

	res.redirect('/')
})

//Export (allow me to include this in another page)
module.exports = router