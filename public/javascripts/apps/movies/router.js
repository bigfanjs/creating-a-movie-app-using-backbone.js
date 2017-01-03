import Backbone from 'backbone';
import forEach from 'lodash/forEach';
import MoviesApp from './index';
import App from '../../app';
import BaseRouter from '../../lib/base-router';

export default BaseRouter.extend({
  initialize: function () {
    this.app = App.start( MoviesApp );
  },
  before: {
    'admin/dashboard': function () {
      return new Promise((resolve, reject) => {
        this.porformAuth()
          .fail((err) => {
            this.navigate('admin/login', true);
            reject();
          })
          .done(() => { resolve(); });
      });
    }
  },
  routes: {
    'movies': 'displayMovies',
    'movies/page/:page': 'displayMovies',
    'movies/view/:id': 'viewMovie',
    'movies/edit/:id': 'editMovie',
    'movies/new': 'createMovie',
    'admin': 'admin',
    'admin/dashboard': 'dashboard',
    '': 'defaultRoute'
  },
  displayMovies: function (id = 1) {
    this.app.viewList(id > 0 ? id : 1);
  },
  viewMovie: function ( id ) {
    this.app.viewMovie( id );
  },
  editMovie: function ( id ) {
    this.app.editMovie( id );
  },
  createMovie: function () {
    this.app.createMovie();
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