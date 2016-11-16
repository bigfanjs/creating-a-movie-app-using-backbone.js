'use strict';

const Admine = require('../lib/admine');

exports.form = function ( req, res ) {
  res.render('login', {title: 'Login'});
};

exports.submit = function ( req, res, next ) {
  const body = req.body;

  Admine.authenticate(body.name, body.pass, (err, admine) => {
    if ( err ) return next( err );

    if ( admine ) {
      req.session.uid = admine.id;
      res.redirect('/admin/movies/');
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