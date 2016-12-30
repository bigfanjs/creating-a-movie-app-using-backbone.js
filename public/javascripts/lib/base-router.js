import Backbone from 'backbone';
import _ from 'underscore';
import Session from '';

export default Backbone.Router.extend({
  route: function (route, name, callback) {
    if (!_isRegExp(route)) route = _routeToRegExp(route);
    if (!callback) callback = this[name];

    if (requiresAuth.contains( route )) {
      _.wrap(callback, function (cb) {
        if (Session.isLoggenIn()) {
          cb();
        } else {
          this.navigate('admin/login');
        }
      });
    }
  }
});