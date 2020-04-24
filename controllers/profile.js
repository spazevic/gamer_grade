let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')
let db = require('../models')

//custom middleware that is only applied to routes in this file
router.use(userLogin)


router.get('/user', (req,res) => {
	res.render('profile/user', {moment})
})

router.get('/guest/:id', (req,res) => {
	db.user.findByPk(req.params.id)
	.then(userProfile => {
		res.render('profile/guest', {moment, userProfile})
	})
	.catch(err => {
		res.render('error')
	})
})

router.get('/admin', adminLogin, (req,res) => {
	db.user.findAll()
	.then(users => {
		res.render('profile/admin', {moment, users})
	})
	.catch(err => {
		res.render('error')
	})
})
module.exports = router