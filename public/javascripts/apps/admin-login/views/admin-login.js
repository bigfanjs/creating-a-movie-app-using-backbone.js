import Backbone from 'backbone';
import template from '../templates/login.pug';

export default Backbone.View.extend({
  template,
  className: 'well',
  events: {
    'click #login': 'login'
  },
  login: function (e) {
    e.preventDefault();
    $.ajax({
      url: 'admin/login',
      type: 'POST',
      dataType: 'json',
      data: {
        username: $('#username').val(),
        password: $('#password').val()
      },
      success: function ( data ) {
        window.location.replace = '/admin/pictures';
      }
    });
  }
});