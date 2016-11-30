'use strict';

const
  bcrypt = require('bcrypt'),
  Admin = require('../models')('admin'),
  config = require('./config/');

bcrypt.genSalt(12, (err, salt) => {
  if ( err ) throw err;

  bcrypt.hash(config.admin.password, salt, (err, hash) => {
    if ( err ) throw err;

    Admin.remove({name: config.admin.name}, err => {
      if ( err ) throw err;

      const admin = new Admin({
        name: config.admin.name,
        password: hash
      });

      admin.save( err => {if ( err ) throw err; });
    });
  });
});

module.exports = {
  authenticate: function (name, password, callback) {
    Admin.findOne({ name }, (err, admin) => {
      if ( err ) { return callback( err ); }

      if (!admin._id) { return callback(); }

      bcrypt.compare(password, admin.password, (err, res) => {
        if ( err ) { return callback( err ); }

        callback(null, res === true ? admin : '');
      });
    });
  }
};