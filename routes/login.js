'use strict';

const Admine = require('../lib/admine');

exports.form = function ( req, res ) {
  res.render('login', {title: 'Login'});
};

exports.submit = function ( req, res, next ) {
  const admine = req.body.admine;

  Admine.authenticate(admine.name, admine.pass, (err, user) => {
    if ( err ) return next( err );

    if ( user ) {
      req.session.uid = user.id;
      res.redirect('/admine/movies/');
    } else {
      res.error('Sorry, Invalid Credantials!');
      res.redirect('back');
    }
  });
};

exports.logout = function ( req, res ) {
  req.session.destroy(err => {
    if ( err ) throw err;

    res.redirect('/');
  });
};