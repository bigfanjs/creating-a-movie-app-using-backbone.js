import Movie from '../models/movie';

export default function ( req, res ) {
  Movie.find({ _id: req.params.id }, (err, movie) => {
    if ( err ) return next( err );

    res.json( movie );
  });
}