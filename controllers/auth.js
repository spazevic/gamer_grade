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
	res.render('auth/signup')
});

//Export (allow me to include this in another page)
module.exports = router