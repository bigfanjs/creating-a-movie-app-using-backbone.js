import Backbone from 'backbone';
import MoviesApp from './index';
import App from '../../app';
import BaseRouter from '../../lib/base-router';

export default BaseRouter.extend({
  initialize: function () {
    this.app = App.start( MoviesApp );
    BaseRouter.prototype.initialize.call( this );
  },
  routes: {
    'movies': 'displayMovies',
    'movies/page/:page': 'displayMovies',
    'movies/view/:id': 'viewMovie',
    'admin': 'admin',
    'admin/dashboard': 'dashboard',
    '': 'defaultRoute'
  },
  requiresAuth: ['admin/dashboard'],
  preventAccessWhenAuth: ['admin/login'],
  displayMovies: function (id = 1) {
    this.app.viewList(id > 0 ? id : 1);
  },
  viewMovie: function ( id ) {
    this.app.viewMovie( id );
  },
  dashboard: function (id = 1) {
    this.app.viewDashboard(id > 0 ? id : 1);
  },
  admin: function () {
    this.navigate('admin/dashboard', true);
  },
  defaultRoute: function () {
    this.navigate('movies', true);
  }
});