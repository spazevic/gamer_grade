//require modules
let express = require('express');
let layouts = require('express-ejs-layouts');
let flash = require('connect-flash')
let session = require('express-session')

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

//sessions
app.use(session({
	secret: 'any string is fine',
	resave: false,
	saveUninitialized: true
}))

//set up connect flash (depends on session)
app.use(flash())

// Custom Middleware = make certain varibles available to EJS pages through locals
app.use((req, res, next) => {
	res.locals.alerts = req.flash()
	next()
})

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