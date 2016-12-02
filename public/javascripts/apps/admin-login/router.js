import Backbone from 'backbone';
import $ from 'jquery';
import App from '../../app';
import loginApp from '';

export default Backbone.Router.extend({
  initialize: function () {
    this.app = App.start( loginApp );
  },
  routes: {
    '/admin/login': 'login'
  },
  login: function () {
    this.app.viewForm();
  }
});