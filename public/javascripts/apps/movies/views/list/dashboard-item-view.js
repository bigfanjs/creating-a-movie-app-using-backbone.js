import ModelView from '../../../../lib/model-view';
import template from '../../templates/list/dashboard-item.pug';
import App from '../../../../app';

export default ModelView.extend({
  template,
  tagName: 'tr',
  events: {
    'click #delete': 'removeMovie',
    'click #edit': 'editMovie'
  },
  removeMovie: function () {},
  editMovie: function () {},
});