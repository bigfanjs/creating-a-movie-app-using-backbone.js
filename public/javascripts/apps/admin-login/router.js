import Backbone from 'backbone';
import $ from 'jquery';
import App from '../../app';
import loginApp from './index.js';

export default Backbone.Router.extend({
  initialize: function () {
    this.app = App.start( loginApp );
  },
  routes: {
    'admin': 'displayMoviesIfLoggedIn',
    'admin/login': 'login'
  },
  login: function () {
    this.app.viewForm();
  },
  displayMoviesIfLoggedIn: function () {
    $.ajax({
      url: '/session',
      type: 'GET',
      succcess: data => {
        this.navigate('admin/movies');
      },
      error: err => {
        this.navigate('admin/login', true);
      }
    });
  }
});