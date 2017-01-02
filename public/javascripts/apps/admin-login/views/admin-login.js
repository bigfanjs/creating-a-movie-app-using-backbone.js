import Backbone from 'backbone';
import $ from 'jquery';
import ModelView from '../../../lib/model-view';
import template from '../templates/login-form.pug';

export default ModelView.extend({
  template,
  className: 'row',
  events: {
    'click #login': 'login'
  },
  login: function (e) {
    e.preventDefault();

    $.ajax({
      url: '/admin/login',
      type: 'POST',
      dataType: 'json',
      data: {
        username: $('#username').val(),
        password: $('#password').val()
      },
      error: err => {
        window.location.pathname = 'admin/login';
      },
      success: data => {
        window.location.pathname = 'admin/dashboard';
      }
    });
  }
});