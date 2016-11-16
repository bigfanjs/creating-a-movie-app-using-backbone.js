'use strict';

const mongoose = require('mongoose');

mongoose.createConnection('mongodb://127.0.0.1/admines');

const schema = new mongoose.Schema({
  name: String,
  password: String
});

module.exports = mongoose.model('admine', schema);