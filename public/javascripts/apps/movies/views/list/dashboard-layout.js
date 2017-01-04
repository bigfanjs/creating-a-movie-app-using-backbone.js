import Layout from '../../../../lib/layout';
import template from '../../templates/list/dashboard-layout.pug';

export default Layout.extend({
  template,
  className: 'row page-container',
  regions: {
    navbar: '.dashboard-navbar',
    filters: '.dashboard-filter-bar',
    list: '.dashboard-view'
  }
});