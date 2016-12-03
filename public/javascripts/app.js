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

var app = null;

export default {
  region: Region.setup({elem: '#main'}),
  setup: function (options = {}) {
    new AdminRouter();

    this.router = new MoviesRouter();

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

    app = App.setup({ region: this.region });

    return app;
  },
  // Forward the message to other sub apps!
  notify: function ( msg ) {}
};