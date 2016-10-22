import Layout from '../../../../lib/layout';
import template from '../../templates/viewer/movie-viewer-about.pug';

export default Layout.extend({
  template,
  className: 'panel panel-simple',
  regions: {
    actors: '.actor-list-container'
  }
});