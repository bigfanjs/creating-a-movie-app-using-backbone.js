'use strict';

module.exports = function (mongoose, db) {
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

  return db.model('movie', schema);
};