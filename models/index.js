'use strict';

const mongoose = require('mongoose');

const
  config = require('../congig'),
  db = mongoose.connect(config.databas.uri);

const
  Admin = require('./admin')(mongoose, db),
  Movie = require('./movie')(mongoose, db);

const models = {admin: Admin, movie: Movie};

module.exports = function ( model ) {
  return models[ model ];
};