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

exports.deleteMovie = function ( req, res, next ) {
  Movie.remove({ _id: req.params.id }, ( err, movie ) => {
    if ( err ) return next( err );

    res.json( movie );
  });
};