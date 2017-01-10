'use strict';

module.exports = function (mongoose, db) {
  const schema = new mongoose.Schema({
    title: String,
    genre: String,
    runningTime: String,
    releaseDate: String,
    featureSong: String,
    overview: String,
    directore: String,
    boxOffice: String,
    narrator: String,
    country: String,
    language: String,
    cast: [{
      actor: String,
      character: String,
      avatar: {
        file: String,
        url: String
      },
      star: Boolean
    }],
    cover: {
      file: String,
      url: String
    },
    meta: {
      dateAdded: String,
      favorites: Number,
      watches: Number
    } 
  });

  return db.model('movie', schema);
};