//require modules
let express = require('express');
let layouts = require('express-ejs-layouts');

//create app instance
let app = express();

//set template langto ejs
app.set('view engine', 'ejs');

//tell express to use the layouts module
app.use(layouts);

//set up static folder
app.use(express.static('static'));

//decrypt varibles from post-routes 
app.use(express.urlencoded({extended:false}))

//controllers
app.use('/auth', require('./controllers/auth'));

//create home page route
app.get('/', (req,res) => {
	res.render('home');
});

//create a wildcard (catch-all)
app.get('*', (req,res) => {
	res.render('error')
});

//listen point
app.listen(3000);