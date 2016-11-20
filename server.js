'use strict';

const
  path = require('path'),
  express = require('express');

const tempData = [
  { title: "Titanic",
    type: 'Romantic',
    runningTime: '123mins',
    releaseYear: '1999',
    cover: {
      path: 'the-campaign.jpg',
      name: 'avatar' },
    story: 'some text for the movie\'s story' },
  { title: "Death pool",
    type: 'Action',
    runningTime: '103mins',
    releaseYear: '2014',
    cover: {
      path: 'the-campaign.jpg',
      name: 'interstellar' },
    story: 'some text for the movie\'s story' },
  { title: "Showlin Soccer",
    type: 'comidian',
    runningTime: '132mins',
    releaseYear: '2006',
    cover: {
      path: 'the-campaign.jpg',
      name: 'the-campaign' },
    story: 'some text for the movie\'s story' },
  { title: "The campaign",
    type: 'comidian',
    runningTime: '132mins',
    releaseYear: '2006',
    cover: {
      path: 'the-campaign.jpg',
      name: 'the-campaign' },
    story: 'some text for the movie\'s story' },
  { title: "Where is the millers",
    type: 'comidian',
    runningTime: '132mins',
    releaseYear: '2006',
    cover: {
      path: 'the-campaign.jpg',
      name: 'the-campaign' },
    story: 'some text for the movie\'s story' }
];

const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.get('/api/movies/', function (req, res, next) {
  res.json( tempData );
});

app.get('api/movies/:id', function (req, res, next) {
  res.json( tempData[ 0 ] );
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});