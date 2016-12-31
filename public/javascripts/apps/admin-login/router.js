import Backbone from 'backbone';
import App from '../../app';
import loginApp from './index.js';

export default Backbone.Router.extend({
  initialize: function () {
    this.app = App.start( loginApp );
  },
  routes: {
    'admin/login': 'login'
  },
  login: function () {
    this.app.viewForm();
  }
});