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

// initiating express:
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.use(favicon('./public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser('What should I say?'));
app.use(session());
app.use(express.static(path.join(__dirname, './public')));
app.use('/admin/movies', movies.authenticate);

app.get('/api/movies/', movies.showMovies);
app.get('/api/movies/:id', movies.viewMovie);

// administration:
app.get('/admin/login/', login.form);
app.post('/admin/login/', login.submit);
app.get('/admin/logout/', login.logout);

app.get('/admin/movies/:id', movies.viewMovie);
app.get('/admin/movies/', movies.showMovies);
app.post('/admin/movies/', movies.createMovie);
app.put('/admin/movies/:id', movies.updateMovie);
app.delete('/admin/movies/:id', movies.deleteMovie);

app.listen(3000, function () {
  console.log('Listening on port 3000');
});