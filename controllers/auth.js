//Node modules/Varibles
let router = require('express').Router();

//routes
router.get('/login', (req,res) => {
	res.render('auth/login')
});

//POST /auth/login - this is where login form pstst to
router.post('/login', (req,res) => {
	console.log('DATA', req.body)
	res.send('Hello there')
})

router.get('/signup', (req,res) => {
	res.render('auth/signup', {data: {}})
});

router.post('/signup', (req,res) => {
	console.log('DATA', req.body)
	if (req.body.password != req.body.password_verify) {
	//send a message on why things didn't work
	req.flash('error', 'Passwords do not match')
		res.render('auth/signup', {data: req.body, alerts: req.flash})
	}
	res.send('goo job')
})

//Export (allow me to include this in another page)
module.exports = router