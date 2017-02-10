'use strict';

module.exports = function (mongoose, db) {
  const schema = new mongoose.Schema({
    title: String,
    genre: String,
    runningTime: String,
    releaseDate: {
      month: String,
      day: String,
      year: String
    },
    overview: String,
    director: String,
    boxOffice: String,
    budget: String,
    country: String,
    language: String,
    cast: [{
      actor: String,
      character: String,
      avatar: {
        file: String,
        url: String
      },
      star: Boolean,
      gender: String
    }],
    cover: {
      file: String,
      url: String
    },
    meta: {
      likes: Number,
      disLikes: Number,
      watches: Number
    } 
  }, { timestamps: true });

  return db.model('movie', schema);
};