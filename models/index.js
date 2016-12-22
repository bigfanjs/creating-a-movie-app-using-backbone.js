'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const
  config = require('../config'),
  db = mongoose.connect(config.database.uri);

const
  Admin = require('./admin')(mongoose, db),
  Movie = require('./movie')(mongoose, db);

const models = {admin: Admin, movie: Movie};

module.exports = function ( model ) {
  return models[ model ];
};