import Movie from '../models/movie';

export default function ( req, res ) {
  Movie.find((err, movies) => {
    if ( err ) return next( err );

    res.json( movies );
  });
}