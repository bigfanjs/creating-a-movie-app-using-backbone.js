import Backbone from 'backbone';
import App from '../../app';
import loginApp from './index.js';
import BaseRouter from '../../lib/base-router';

export default BaseRouter.extend({
  initialize: function () {
    this.app = App.start( loginApp );
  },
  routes: {
    'admin/login': 'login'
  },
  before: {
    'admin/login': function () {
      return new Promise((resolve, reject) => {
        this.porformAuth()
          .done(() => {
            this.navigate('admin/dashboard', true);
            reject();
          })
          .fail(() => { resolve(); });
      });
    }
  },
  login: function () {
    this.app.viewForm();
  }
});