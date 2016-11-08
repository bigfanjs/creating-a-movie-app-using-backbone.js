import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'server-favicon';
import logger from 'morgan';

// importing routes:
import showMovies from './routes/show-movies';
import viewMovie from './routes/view-movie';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(favicon('./public/favicon.ico'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json());

app.get('/api/movies/', showMovies);
app.get('/api/movies/:id', viewMovie);

app.listen(3000, function () {
  console.log('Listening on port 3000');
});