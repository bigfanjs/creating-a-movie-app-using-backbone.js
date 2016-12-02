'use strict';

const Movie = require('../models')('movie');

const send404 = function (res, err) {
  res.status(404).end(err);
};

exports.showMovies = function (req, res) {
  Movie.find((err, movies) => {
    if ( err ) { return send404(res, err); }

    res.status(200).json( movies );
  });
};

exports.viewMovie = function (req, res) {
  Movie.find({ _id: req.params.id }, ( err, movie ) => {
    if ( err ) { return send404(res, err); }

    res.status(200).json( movie );
  });
};

exports.createMovie = function (req, res) {
  Movie.create((err, movie) => {
    if ( err ) { return send404(res, err); }

    res.status( 201 ).json( movie );
  });
};

exports.updateMovie = function (req, res) {
  Movie.update(
    { _id: req.params.id },
    req.body,
    { multi: false },
    (err, movie) => {
      if ( err ) { return send404(res, err); }

      res.status(201).json( movie );
    }
  );
};

exports.deleteMovie = function (req, res) {
  Movie.remove({ _id: req.params.id }, (err, movie) => {
    if ( err ) { return send404(res, err); }

    res.status(204).json( movie );
  });
};