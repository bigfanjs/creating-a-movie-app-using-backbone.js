import Layout from '../../../../lib/layout';
import template from '../../templates/viewer/movie-viewer-layout.pug';

export default Layout.extend({
  template,
  className: 'row page-container',
  regions: {
    widget: '.movie-widget',
    about: '.about-container'
  }
});