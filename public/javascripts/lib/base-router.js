import Backbone from 'backbone';
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
      const args = this._extractParameters(route, fragment);

      this.execute(callback, args, name).then(function ( res ) {
        this.trigger.apply(this, ['route:' + name].concat(args));
        this.trigger('route', name, args);
        Backbone.history.trigger('route', this, name, args);
      });
    });

    return this;
  }
});