'use strict';

const
  path = require('path'),
  express = require('express'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  multer = require('multer');

// requiring routes:
const
  movies = require('./routes/movies'),
  login = require('./routes/login');

const admin = require('./lib/middleware/admin');
// initiating express:
const
  app = express(),
  upload = multer({dest: 'tmp/'}),
  join = path.join;

const isAuth = function (req, res, next) {
  const uid = req.session.uid;

  if (uid) {
    return next();
  } else {
    res.status(401).end('Access Denied');
  }
};

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('covers', join(__dirname, './public/images/covers/'));
app.set('avatars', join(__dirname, './public/images/avatars/'));

// app.use(favicon('./public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('What should I say?'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'my little cat'
}));
app.use(express.static(join(__dirname, './public')));
app.use(admin());

// administration:
app.get('/admin/logout/', login.logout);
app.post('/admin/login/', login.submit);

app.get('/session', isAuth, function (req, res) {
  res.status(200).json( res.admin );
});

app.get('/api/movies/', movies.showMovies);
app.get('/api/movies/count', movies.count);
app.get('/api/movies/:id', movies.viewMovie);
app.post('/api/movies/', isAuth, movies.createMovie);
app.put('/api/movies/:id', isAuth, movies.updateMovie);
app.delete('/api/movies/:id', isAuth, movies.deleteMovie);
app.post(
  '/api/movies/:id/cover',
  isAuth,
  upload.single('cover'),
  movies.uploadCover.bind(null, app.get('covers'))
);
app.post(
  '/api/movies/:id/avatars',
  isAuth,
  upload.array('avatars'),
  movies.uploadAvatars.bind(null, app.get('avatars'))
);

/* reroute all urls to the public/index.js to allow Backbone
   to deal with routing.*/
app.get('*', (req, res) => {
  res.sendFile('app.html', {
    root: join(__dirname, './public')
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});