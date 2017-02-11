import Layout from '../../../../lib/layout';
import template from '../../templates/list/movie-list-layout.pug';

export default Layout.extend({
  template,
  className: 'row page-container',
  regions: {
    filters: '.movie-filter-bar',
    list: '.movie-list-view',
    page: '.movie-list-pag-bar'
  }
});