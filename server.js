'use strict';

const
  path = require('path'),
  express = require('express'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  favicon = require('serve-favicon'),
  logger = require('morgan');

// requiring routes:
const
  movies = require('./routes/movies'),
  login = require('./routes/login');

const
  admin = require('./lib/middleware/admin'),
  isAuthenticated = admin.isAuthenticated;

// initiating express:
const
  app = express(),
  join = path.join;

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

// app.use(favicon('./public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('What should I say?'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'my little cat'
}));
app.use(express.static(join(__dirname, './public')));

/* reroute all urls to the public/index.js to allow Backbone
   to deal with routing.*/
app.use('/movies', express.static(join(__dirname, './public')));
app.use('/admin/login', express.static(join(__dirname, './public')));
app.use('/admin', function (req, res, next) {
  if (req.session.uid) {
    res.redirect('/movies');
  } else {
    res.redirect('/admin/login');
  }
});

// administration:
app.get('/admin/logout/', login.logout);
app.post('/admin/login/', login.submit);

app.get('/api/movies/', movies.showMovies);
app.get('/api/movies/:id', movies.viewMovie);
app.post('/api/movies/', isAuthenticated(), movies.createMovie);
app.put('/api/movies/:id', isAuthenticated(), movies.updateMovie);
app.delete('/api/movies/:id', isAuthenticated(), movies.deleteMovie);

app.listen(3000, function () {
  console.log('Listening on port 3000');
});