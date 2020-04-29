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

router.get('/reviews', (req,res) => {
	db.rating.findAll({
		include: [db.game]
	})
	.then(ratings => {
		res.render('profile/reviews', {ratings})
	})
	.catch(err => {
		res.render('error')
	})
	
})

router.get('/create/:id', (req,res) => {
	db.game.findOne({
		where: {id: req.params.id }
	})
	.then(game => {
		res.render('profile/create', {game})
	})
	.catch(err => {
		res.render('error')
	})
})

router.post('/create/:id', (req,res) => {
	db.rating.create({
		userId: req.body.userId,
		rating: req.body.rating,
		gameId: req.body.gameId

	})
	.then(rating => {
		res.send('ooh rah')
	})
	.catch(err => {
		res.render('error')
	})
})

module.exports = router