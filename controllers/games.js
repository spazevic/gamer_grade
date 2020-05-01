let router = require('express').Router();
let db = require('../models')
let axios = require('axios')

router.get('/search', (req,res) => {
	res.render('games/search');
});

router.get('/show', (req,res) => {
	res.render('games/show');
});

router.post('/search', (req,res) => {
	axios({
	  url: "https://api-v3.igdb.com/games",
	  method: 'POST',
	  headers: {
	      'Accept': 'application/json',
	      'user-key': process.env.VG_API_KEY
	  },
	  data: `fields  *; search \"${req.body.name}\";`
	})
  .then(response => {
  	let gameData = response.data
  
    
    axios({
	  url: "https://api-v3.igdb.com/release_dates",
	  method: 'POST',
	  headers: {
	      'Accept': 'application/json',
	      'user-key': process.env.VG_API_KEY
	  },
	  data: `fields *; where date=${gameData[0].first_release_date};`
	  })
    	.then(date => {
    		let dateData = date.data
    		 res.render('games/show', {gameData, dateData});
    	})
    	.catch(err => {
      	console.error(err);
  		}); 
  })
  .catch(err => {
      console.error(err);
  });
});


router.post('/choose', (req,res) => {
	axios({
	  url: "https://api-v3.igdb.com/games",
	  method: 'POST',
	  headers: {
	      'Accept': 'application/json',
	      'user-key': process.env.VG_API_KEY
	  },
	  data: `fields *; where name=\"${req.body.name}\";`
	})
  .then(response => {
  	let gameData = response.data
 
   

    
    axios({
	  url: "https://api-v3.igdb.com/release_dates",
	  method: 'POST',
	  headers: {
	      'Accept': 'application/json',
	      'user-key': process.env.VG_API_KEY
	  },
	  data: `fields *; where date=${gameData[0].first_release_date};`
	  })
    	.then(date => {
    		let dateData = date.data
    		
		    axios({
			  url: "https://api-v3.igdb.com/covers",
			  method: 'POST',
			  headers: {
			      'Accept': 'application/json',
			      'user-key': process.env.VG_API_KEY
			  },
			  data: `fields *; where id=${gameData[0].cover};`
			  })
		    	.then(art => {
		    		let coverData = art.data
		    		 res.render('games/choose', {gameData, dateData, coverData});
		    	})
		    	.catch(err => {
		      	console.error(err);
		  		}); 
    		 
    	})
    	.catch(err => {
      	console.error(err);
  		}); 
  })
  .catch(err => {
   console.error(err);
  });
});

router.post('/newGame',(req,res) => {
	db.game.create({
		name: req.body.name,
		summary: req.body.summary,
		cover: req.body.cover,
		release: req.body.release
	})
	.then(() => {
		res.redirect('./list')
	})
	.catch(err => {
  	console.error(err);
	}); 
	
})

router.get('/list', (req,res) => {
	db.game.findAll({
		include: [db.rating]
	})
	.then(games => {
		res.render('games/list', {games})
	})
	
})

router.get('/all', (req,res) => {
	db.game.findAll({
		include: [db.rating]
	})
	.then(games => {

		res.render('games/all', {games})
	})
	
})

router.get('/:id', (req,res) => {
	db.game.findOne({
		where: {id : req.params.id},
		include: [db.rating]
	})
	.then(game => {
		res.render('games/gamePage', {game})
	})
	.catch(err => {
  	console.error(err);
	});		 
	
})




module.exports = router
