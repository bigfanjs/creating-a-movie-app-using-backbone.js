import Backbone from 'backbone';
import MovieModel from '../models/movie-model';

// a collection for movie models.
export default Backbone.Collection.extend({
  initialize( options ) {
    this.page = options.page;
  },
  url: function () {
    return '/api/movies/' + this.page;
  },
  model: MovieModel
});