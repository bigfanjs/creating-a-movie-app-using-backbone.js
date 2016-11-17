'use strict';

const
  bcrypt = require('bcrypt'),
  Admine = require('../models/admine'),
  admineName = 'Adel';

bcrypt.genSalt(12, (err, salt) => {
  if ( err ) throw err;

  bcrypt.hash('123456', salt, (err, hash) => {
    if ( err ) throw err;

    Admine.remove({name: admineName}, err => {
      if ( err ) throw err;
    });

    const admine = new Admine({name: admineName, password: hash});

    admine.save( err => {if ( err ) throw err; });
  });
});

module.exports = {
  authenticate: function (name, pass, callback) {
    Admine.findOne({ name: name }, (err, admine) => {
      if ( err ) return callback( err );

      if ( !admine._id ) {
        return callback();
      }

      bcrypt.compare(pass, admine.password, (err, res) => {
        if ( err ) return callback( err );

        if ( res === true ) {
          return callback(null, admine);
        }
      });
    });
  }
};