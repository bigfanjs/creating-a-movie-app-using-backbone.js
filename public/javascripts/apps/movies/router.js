import Backbone from 'backbone';
import $ from 'jquery';
import forEach from 'lodash/forEach';
import MoviesApp from './index';
import App from '../../app';

export default Backbone.Router.extend({
  initialize: function () {
    this.app = App.start( MoviesApp );
  },
  execute: function (callback, args, name) {
    var route;

    forEach(this.routes, (value, key) => {
      if (name == value) {
        route = key;
      }
    });

    if (this.requiresAuth.includes(route)) {
      $.ajax('/session')
        .done(() => {
          this.navigate('admin/dashboard', true);
        })
        .fail(() => {
          this.navigate('admin/login', true);
        });

      return false;
    }

    if (this.preventAccessWhenAuth.includes(route)) {
      $.ajax('/session')
        .done(() => {
          this.navigate('admin/dashboard', true);
        })
        .fail(() => {
          this.navigate('admin/login');
        });

      return false;
    }

    if (callback) {
      return callback.apply(this, args);
    }
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