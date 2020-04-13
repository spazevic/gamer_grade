//Node modules/Varibles
let router = require('express').Router();

//routes
router.get('/login', (req,res) => {
	res.render('auth/login')
});

router.get('/signup', (req,res) => {
	res.render('auth/signup')
});

//Export (allow me to include this in another page)
module.exports = router