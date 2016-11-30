'use strict';

const Admin = require('../lib/admin');

function send404(res, err) {
  res.status(404).end(err);
}

exports.submit = function (req, res) {
  const body = req.body;

  Admin.authenticate(body.name, body.pass, (err, admin) => {
    if ( err ) { return send404(res, err); }

    if ( admin ) {
      req.session.uid = admin.id;
      res.status(202).json( admin );
    } else {
      res.status(401).end('Sorry, Invalid Credantials!');
    }
  });
};

exports.logout = function (req, res) {
  req.session.destroy(err => {
    if ( err ) { return send404(res, err); }

    res.status(402).json('session destroyed');
  });
};