import $ from 'jquery';
import Backbone from 'backbone';
import Region from './lib/region';
import isFunction from 'lodash/isFunction';
import MoviesRouter from './apps/movies/router';
import AdminRouter from './apps/admin-login/router';

Backbone.Model.prototype.idAttribute = '_id';

const
  assign = Object.assign,
  create = Object.create;

var
  app = null,
  admin = false;

export default {
  region: Region.setup({elem: '#main'}),
  setup: function (options = {}) {
    this.router = new MoviesRouter();

    new AdminRouter();

    assign(this, Backbone.Events, options);

    Backbone.history.start({pushState: true});
  },
  start: function ( App ) {
    // if the application is already defined.
    if ( app ) {
      if (App.isPrototypeOf( app )) {
        return app;
      } else if (isFunction( app.destroy )) {
        app.destroy();
      }
    }

    app = App.setup({region: this.region});

    return app;
  },
  // Forward the message to other sub apps!
  notify: function ( msg ) {},
  conformAuth: function () {
    $.ajax('/session')
      .done(function () {
        admin = true;
      })
      .fail(function () {
        admin = false;
      });

    return this;
  },
  isLoggedIn: function () {
    return admin;
  }
};