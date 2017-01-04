import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-form.pug';

export default ModelView.extend({
  template,
  className: 'col-xs-12 col-sm-8 col-md-9',
  events: {
    'click #cancel': 'cancel',
    'click #save': 'save'
  },
  cancel: function () {},
  save: function () {}
});