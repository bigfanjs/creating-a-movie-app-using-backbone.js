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

  console.log(req.file.path, req.file.fieldname, req.body);

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
      undefined, path.extname(req.file.originalname)
    );
    fullpath = dir + filename;
  } while (fs.existsSync(fullpath));

  const
    wstream = fs.createWriteStream(fullpath),
    rstream = fs.createReadStream('./tmp/' + req.file.filename);

  const cover = {
    file: filename,
    url: '/images/covers/' + filename
  };

  rstream
    .on('err', function ( err ) {
      res.status(400).json({error: 'Failed Uploading Avatar'});
    })
    .on('end', function () {
      fs.unlink('./tmp/' + req.file.filename, err => {
        if ( err ) { return next( err ); }

        Movie.findByIdAndUpdate(req.params.id,
          {$set: { cover }},
          (err, movie) => {
            if ( err ) { return next( err ); }

            if (has(movie, 'cover.file')) {
              const prevAvatar = dir + movie.cover.file;

              if (fs.existsSync(prevAvatar)) {
                fs.unlinkSync(prevAvatar);
              }
            }

            res.status(200).json( cover );
          }
        );
      });
    })
    .pipe(wstream);
};

exports.uploadAvatars = function (dir, req, res, next) {
  if (!req.headers['content-type'].match(/multipart\/form-data/)) {
    res.status(400).json({error: 'Invalid content type header!'});
    return next();
  }

  if (!has(req, 'files')) {
    return res
      .status(400)
      .json({error: 'No images uploaded just yet!'});
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }


  // ---------------------------

  // const promises = [];

  // req.files.forEach((file, idx) => {
  //   let filename, fullpath;

  //   do {
  //     filename = generateName(
  //       undefined, path.extname(file.originalname)
  //     );
  //     fullpath = dir + filename;
  //   } while (fs.existsSync(fullpath));

  //   const
  //     wstream = fs.createWriteStream(fullpath),
  //     rstream = fs.createReadStream(file.path);

  //   const avatar = {
  //     file: filename,
  //     url: '/images/avatars/' + filename
  //   };

  //   const promise = new Promise((resolve, reject) => {
  //     rstream
  //       .on('err', function ( err ) {
  //         res.status(400).json({error: 'Failed Uploading Avatar'});
  //       })
  //       .on('end', function () {
  //         fs.unlink(file.path, err => {
  //           if ( err ) { return next( err ); }

  //           Movie.findById(req.params._id, (err, movie) => {
  //             if ( err ) { return next( err ); }

  //             movie.cast[ idx ].avatar = avatar;

  //             movie.save((err, updatedMovie) => {
  //               if ( err ) { return next( err ); }

  //               resolve( avatar );
  //             });
  //           });
  //         });
  //       })
  //       .pipe(wstream);
  //   });

  //   promises.push( promise );
  // });

  // Promise
  //   .all(promises)
  //   .then(avatars => {
  //     res.status(200).json(JSON.stringify(avatars));
  //   });

  // ---------------------------


  Movie.findById(req.params.id, (err, movie) => {
    if (err) { return next( err ); }

    const promises = [];

    movie.cast = movie.cast.map((actor, idx) => {
      const file = req.files[ idx ];

      let filename, fullpath;

      do {
        filename = generateName(
          undefined, path.extname(file.originalname)
        );
        fullpath = dir + filename;
      } while (fs.existsSync(fullpath));

      const
        wstream = fs.createWriteStream(fullpath),
        rstream = fs.createReadStream(file.path);

      if(has(actor, 'avatar.file')) {
        const prevAvatar = dir + actor.avatar.file;

        if (fs.existsSync(prevAvatar)) {
          fs.unlinkSync(prevAvatar);
        }
      }

      actor.avatar = {
        file: file.filename,
        url: '/images/avatars/' + file.filename
      };

      const promise = new Promise((resolve, reject) => {
        rstream
          .on('err', function ( err ) {
            res.status(400).json({error: 'Failed Uploading Avatar'});
          })
          .on('end', function () {
            fs.unlink(file.path, err => {
              if ( err ) { return next( err ); }

              resolve(actor.avatar);
            });
          })
          .pipe(wstream);
      });


      promises.push(promise);

      return actor;
    });

    movie.save((err, updatedMovie) => {
      if ( err ) { return next( err ); }

      Promise
        .all(promises)
        .then(avatars => {
          res.status(200).json(JSON.stringify(avatars));
        });
    });
  });
};