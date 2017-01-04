import ModelView from '../../../../lib/model-view';
import template from '../../templates/list/dashboard-navbar.pug';
import App from '../../../../app';

export default ModelView.extend({
  template,
  className: 'dashboard-navbar',
  events: {
    'click #create-movie': 'createMovie'
  },
  createMovie: function () {
    App.router.navigate('movies/new', true);
  }
});