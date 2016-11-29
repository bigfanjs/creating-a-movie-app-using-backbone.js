'use strict';

const Movie = require('../models/movie');

exports.showMovies = function ( req, res, next ) {
  Movie.find((err, movies) => {
    if ( err ) return next( err );

    res.json( movies );
  });
};

exports.viewMovie = function ( req, res, next ) {
  Movie.find({ _id: req.params.id }, ( err, movie ) => {
    if ( err ) return next( err );

    res.json( movie );
  });
};

exports.createMovie = function (req, res, next) {
  Movie.create((err, movie) => {
    if ( err ) return next( err );

    res.status( 201 ).json( movie );
  });
};

exports.updateMovie = function (req, res, next) {
  Movie.update(
    { _id: req.params.id },
    req.body,
    { multi: false },
    (err, movie) => {
      if ( err ) return next( err );

      res.json( movie );
    }
  );
};

exports.deleteMovie = function ( req, res, next ) {
  Movie.remove({ _id: req.params.id }, ( err, movie ) => {
    if ( err ) return next( err );

    res.json( movie );
  });
};