import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '/session',
  isAuthenticated: function (callback) {
    const session = this.fetch();

    session.done(function (response) {
      this.navigate('/admin/dashboard');
    });

    session.fail(function (err) {
      this.navigate('/admin/login');
    });

    session.always(callback);
  }
});