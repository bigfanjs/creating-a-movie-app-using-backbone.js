import Backbone from 'backbone';
import MovieModel from '../models/movie-model';

// a collection for movie models.
export default Backbone.Collection.extend({
  initialize( options ) {
    this.page = options.page;
  },
  url: function () {
    const
      page = this.page,
      query = typeof page !== 'undefined' ? '?page=' + this.page : '';

    return '/api/movies' + query;
  },
  model: MovieModel
});