import Backbone from 'backbone';
import MovieModel from '../models/movie-model';

// a collection for movie models.
export default Backbone.Collection.extend({
  url: '/api/movies',
  model: MovieModel
});