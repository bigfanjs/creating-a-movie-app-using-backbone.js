'use strict';

const
  fs = require('fs'),
  path = require('path'),
  crispy = require('crispy-string'),
  has = require('lodash/has'),
  Movie = require('../models')('movie');

const send404 = function (res, err) {
  res.status(404).end(err);
};

const
  generateName = function (len, ext) {
    return crispy.base32String(len || 10) + ext;
  },
  generateFullPath = function (dir, filename) {
    return dir + filename;
  },
  isValidImg = function (mimetype) {
    return /jpg|jpeg|png|gif/i.test( mimetype );
  };

exports.showMovies = function (req, res) {
  const callback = function (err, movies) {
    if ( err ) { return send404(res, err); }

    res.status(200).json( movies );
  };

  if (req.session.uid) {
    Movie.find({}, callback);
  } else {
    Movie.find({}, {meta: 0}, callback);
  }
};

exports.viewMovie = function (req, res) {
  Movie.find({ _id: req.params.id }, ( err, movie ) => {
    if ( err ) { return send404(res, err); }

    res.status(200).json( movie );
  });
};

exports.createMovie = function (req, res) {
  console.log('body:', req.body);
  Movie.create(req.body, (err, movie) => {
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

exports.uploadCover = function (dir, req, res, next) {
  var filename, fullpath;

  if (!req.headers['content-type'].match(/multipart\/form-data/)) {
    return res
      .status(400)
      .json({error: 'Invalid content type header.'});
  }

  if (!has(req, 'file')) {
    return res
      .status(400)
      .json({error: 'Nothing has uploaded just yet!'});
  }

  if (!isValidImg(req.file.mimetype)) {
    res
      .status(400)
      .json({error: 'Invalid uploaded Image.'});

    return next();
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  do {
    filename = generateName(
      undefined,
      path.extname(req.file.originalname)
    );
    fullpath = dir + filename;
  } while (fs.existsSync(fullpath));

  Movie.findById(req.params.id, (err, movie) => {
    if ( err ) { return next( err ); }

    if (has(movie, 'cover.file')) {
      const prevfile = dir + movie.cover.file;

      if (fs.existsSync(prevfile)) {
        fs.unlinkSync(prevfile);
      }
    }

    const wstream = fs.createWriteStream(fullpath);

    wstream.write(req.file.buffer);
    wstream.end();

    const cover = {
      file: filename,
      url: '/images/' + filename
    };

    Movie.findByIdAndUpdate(
      req.params.id,
      { $set: { cover: cover }}
    );

    res.json({cover: cover});
  });
};