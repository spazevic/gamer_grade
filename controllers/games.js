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
    console.log(response.data[0]);
   

    
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
    		console.log(dateData[0].human)
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

router.get('/choose', (req,res) => {
	res.render('games/choose');
})

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
    console.log(response.data[0]);
   

    
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
    		console.log(dateData[0].human)
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
		    		console.log(art.data)
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
		res.render('games/list')
	})
	
})

router.get('/list', (req,res) => {
	db.game.findAll()
	.then(games => {
		res.render('games/list', {games})
	})
	
})




module.exports = router
