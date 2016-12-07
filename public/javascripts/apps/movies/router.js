import Backbone from 'backbone';
import MoviesApp from './index';
import App from '../../app';

export default Backbone.Router.extend({
  initialize: function () {
    this.app = App.start( MoviesApp );
  },
  routes: {
    'movies': 'displayMovies',
    'movies/page/:page': 'displayMovies',
    'movies/view/:id': 'viewMovie',
    '': 'defaultRoute'
  },
  displayMovies: function ( id = 1 ) {
    this.app.viewList(id > 0 ? id : 1);
  },
  viewMovie: function ( id ) {
    this.app.viewMovie( id );
  },
  defaultRoute() {
    this.navigate('movies', true);
  }
});