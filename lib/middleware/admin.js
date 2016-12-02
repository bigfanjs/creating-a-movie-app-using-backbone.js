'use strict';

const Admin = require('../../models/')('admin');

exports.isAuthenticated = function () {
  return function (req, res, next) {
    const uid = req.session.uid;

    if ( uid ) {
      Admin.findOne({ _id: uid }, (err, admin) => {
        if ( err ) {
          res.status(404).json( err );
          return;
        }

        if (admin !== null || !admin._id) {
          res.status(401).json('access deneid');
          return;
        }

        res.admin = admin;
        next();
      });
    } else {
      res.status(401).json('access deneid');
    }
  };
};