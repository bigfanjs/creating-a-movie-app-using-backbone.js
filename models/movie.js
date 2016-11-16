'use strict';

const mongoose = require('mongoose');

mongoose.createConnection('mongodb://127.0.0.1/movies');

const schema = new mongoose.Schema({
  title: String,
  type: String,
  runningTime: String,
  releaseDate: String,
  featureSong: String,
  story: String,
  directore: String,
  boxOffice: String,
  narrator: String,
  country: String,
  language: String,
  cast: [{
    actor: String,
    character: String,
    avatar: {
      name: String,
      path: String
    }
  }],
  starring: [{
    actor: String,
    character: String,
    avatar: {
      name: String,
      path: String
    }
  }],
  cover: {
    name: String,
    path: String
  }
});

module.exports = mongoose.model('movie', schema);