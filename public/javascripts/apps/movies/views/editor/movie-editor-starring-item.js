import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-starring-item.pug';

export default ModelView.extend({
  template,
  className: 'form-group',
  events: {
    'click a': 'deleteActor'
  },
  delete() {
    this.trigger('delete:actor', this.model);
  }
});