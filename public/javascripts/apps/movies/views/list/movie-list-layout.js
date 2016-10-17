import Layout from '../../../../lib/layout';
import template from '../../templates/list/movie-list-layout.pug';

export default Layout.extend({
  template,
  className: 'row page-container',
  regions: {
    filters: '.filter-bar-container',
    list: '.movie-list-view'
  }
});