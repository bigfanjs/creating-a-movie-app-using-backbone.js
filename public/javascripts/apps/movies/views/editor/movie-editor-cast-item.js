import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-cast-item.pug';

export default ModelView.extend({
  template,
  className: 'form-group',
  events: {
    'click a': 'deleteActor'
  },
  deleteActor( e ) {
    e.preventDefault();
    this.trigger('actor:delete', this.model);
  }
});