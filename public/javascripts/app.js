import $ from 'jquery';
import Backbone from 'backbone';
import Region from 'region';
import isFunction from 'lodash/isFunction';
import MoviesRouter from './apps/movies/router';

Backbone.Model.prototype.idAttribute = '_id';

const
  assign = Object.assign,
  create = Object.create;

var app = null;

export default {
  setup: function ( options ) {
    this.router = new MoviesRouter();
    this.region = Region.setup({el: '#main'});

    Object.assign(this, Backbone.Events);

    Backbone.history.start();
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