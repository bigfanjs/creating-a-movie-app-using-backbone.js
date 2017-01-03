import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-layout.pug';

export default ModelView.extend({
  template,
  className: 'row page-container',
  regions: {
    preview: '.movie-editor-preview',
    form: '.movie-editor-form'
  }
});