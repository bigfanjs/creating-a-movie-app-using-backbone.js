import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '/api/movies/count',
  defaults: {
    page: ''
  }
});