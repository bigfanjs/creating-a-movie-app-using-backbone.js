import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-form.pug';

export default ModelView.extend({
  template,
  className: '',
  events: {
    'click #cancel': 'cancel',
    'click #save': 'save'
  },
  cancel: function () {},
  save: function () {}
});