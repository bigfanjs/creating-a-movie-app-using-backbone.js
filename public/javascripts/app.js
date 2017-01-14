import $ from 'jquery';
import Backbone from 'backbone';
import Validation from 'backbone.validation';
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
  notify: function ( msg ) {}
};

assign(Backbone.Validation.callbacks, {
  valid( view, attr ) {
    var $el = view.$(`#${ attr }-input`);

    if ($el.parent().hasClass('input-group')) {
      $el = $el.parent();
    }

    var $group = $el.closest('.form-group');

    $group
      .removeClass('has-error')
      .addClass('has-success');

    var helpBlock = $el.next('.help-block');

    if ( helpBlock.length === 0 ) {
      helpBlock = $el.children('.help-block');
    }

    helpBlock.slideUp({
      done() {
        helpBlock.remove();
      }
    });
  },
  invalid( view, attr, err ) {
    var $el = view.$(`#${ attr }-input`);

    $el.focus();

    var $group = $el.closest('.form-group');

    $group
      .removeClass('has-success')
      .addClass('has-error');

    if ($el.parent().hasClass('input-group')) {
      $el = $el.parent();
    }

    if ($el.next('.help-block').length !== 0) {
      $el.next('.help-block').text( err );
    } else if ($el.children('.help-block').length !== 0) {
      $el.next('.help-block').text( err );
    } else {
      let $err = $('<div>')
        .addClass('help-block')
        .html( err )
        .hide();

      if ($el.prop('tagName') === 'div' && !$el.hasClass('input-group')) {
        $el.append( $err );
      } else {
        $el.after( $err );
      }

      $err.slideDown();
    }
  }
});


// MM/DD/YYYY
assign(Backbone.Validation.patterns, {
  date: /^(\d{2})\/(\d{2})\/(\d{4})$/
});

assign(Backbone.Validation.messages, {
  date: 'not a valid phone'
});