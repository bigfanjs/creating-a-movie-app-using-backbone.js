import LoginForm from '../admin-login';

export default {
  setup: function ( options ) {
    const app = Object.create( this );

    Object.assign(app, options);

    return app;
  },
  viewForm: function () {
    const form = new LoginForm();

    this.region.show( form );
  }
};