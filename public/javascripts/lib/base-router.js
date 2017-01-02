import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import forEach from 'lodash/forEach';
import App from '../app';

export default Backbone.Router.extend({
  route: function (route, name, callback) {
    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }

    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }

    if (!callback) {
      callback = this[ name ];
    }

    Backbone.history.route(route, fragment => {
      let handler;

      const args = this._extractParameters(route, fragment);

      const fn = () => {
        if (this.execute(callback, args, name) !== false) {
          this.trigger.apply(this, ['route:' + name].concat(args));
          this.trigger('route', name, args);
          Backbone.history.trigger('route', this, name, args);
        }
      };

      forEach(this.before, (handler, key) => {
        if (key.match( route )) {
          handler.call(this, callback, args, name).then( fn );
          return false;
        } else {
          fn();
        }
      });

    });

    return this;
  },
  porformAuth: function () {
    return $.ajax({
      url: '/session',
      method: 'GET',
      dataType: 'json'
    });
  }
});