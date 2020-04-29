require('dotenv').config()
//require modules
let express = require('express');
let layouts = require('express-ejs-layouts');
let flash = require('connect-flash')
let session = require('express-session')

//create app instance
let app = express();

//Include passport (via the passport config file)
let passport = require('./config/passportConfig')

//set template langto ejs
app.set('view engine', 'ejs');

//tell express to use the layouts module
app.use(layouts);

//set up static folder
app.use(express.static('static'));

//decrypt varibles from post-routes 
app.use(express.urlencoded({extended:false}))

//sessions
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))

//set up passport (depends on session; must come after it)
app.use(passport.initialize())
app.use(passport.session())

//set up connect flash (depends on session)
app.use(flash())

// Custom Middleware = make certain varibles available to EJS pages through locals
app.use((req, res, next) => {
	res.locals.alerts = req.flash()
	res.locals.user = req.user
	next()
})

//controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/games', require('./controllers/games'));

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