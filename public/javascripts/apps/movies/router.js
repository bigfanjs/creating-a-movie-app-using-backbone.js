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
    const promise = new Promise((res, rej) => {
      forEach(this.routes, (value, key) => {
        if (value === name) {
          if (this.requiresAuth.includes(key)) {
            this.porformAuth(
              () => { res(callback.apply(this, args)); },
              () => { this.navigate('admin/login', true); }
            );
            return false;
          }
          if (this.preventAccessWhenAuth.includes(key)) {
            this.porformAuth(
              () => { this.navigate('admin/dashboard', true); },
              () => { res(callback.apply(this, args)); }
            );

            return false;
          }

          res(callback.apply(this, args));
        }
      });
    });

    return promise;
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
  porformAuth: function (res, rej) {
    $.ajax({
      url: '/session',
      success: res,
      error: rej
    });
  },
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