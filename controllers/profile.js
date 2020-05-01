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


router.get('/guestReview/:id', (req,res) => {
	db.user.findByPk(req.params.id)
	.then(userProfile => {
	
		db.rating.findAll({
			include: [db.game]
		})
		.then(ratings=> {
			res.render('profile/guestReviews', {ratings, userProfile})
		})
		.catch(err => {
			res.render('error')
		})

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


router.get('/edit/:id', (req,res) => {
	db.rating.findOne({
		where: { id: req.params.id}
	})
	.then(rating => {
		res.render('profile/edit', {rating})
	})
	.catch(err => {
  	res.render('error', err)
  	})
})

router.put('/edit/:id', (req,res) => {
	db.rating.update(
		{rating: req.body.rating},
		{where: { id: req.params.id}
		}
	)
	.then(rating => {
		res.redirect('/profile/reviews')
	})
	.catch(err => {
  	res.render('error', err)
  	})
})

router.get('/editUser/:id', (req,res) => {
	db.user.findOne({
		where: { id: req.params.id}
	})
	.then(user => {
		res.render('profile/editUser', {user})
	})
	.catch(err => {
  	res.render('error', err)
  	})
})

router.put('/editUser/:id', (req,res) => {
	db.user.update(
		{username: req.body.username,
			birthday: req.body.birthday,
			pic: req.body.pic,
			bio: req.body.bio},
		{where: { id: req.params.id}
		}
	)
	.then(rating => {
		res.redirect('/profile/user')
	})
	.catch(err => {
  	res.render('error', err)
  	})
})

router.post('/create/:id', (req,res) => {
	db.rating.create({
		userId: req.body.userId,
		rating: req.body.rating,
		gameId: req.body.gameId
	})
	.then(rating => {
		res.redirect('../reviews')
	})
	.catch(err => {
		res.render('error')
	})
})


router.delete('/delete/:id', (req,res) => {
	db.rating.destroy({
		where: {id: req.params.id}
	})
	.then(() => {
		db.rating.destroy({
		where: {id: req.params.id}
		})
		.then(() => {
			res.redirect('/')
		})
		.catch(err => {
			console.log(err)
			res.render('error')
		})

	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

router.get('/allUsers', (req,res) => {
	db.user.findAll()
	.then(users=> {
		res.render('profile/allUsers', {users})
	})
	.catch(err => {
		res.render('error')
	})
})

module.exports = router