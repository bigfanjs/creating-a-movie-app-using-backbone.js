import Layout from '../../../../lib/layout';
import template from '../../templates/editor/movie-editor-layout.pug';

export default Layout.extend({
  template,
  className: 'row page-container',
  regions: {
    preview: '#preview-container',
    form: '#form-container'
  }
});