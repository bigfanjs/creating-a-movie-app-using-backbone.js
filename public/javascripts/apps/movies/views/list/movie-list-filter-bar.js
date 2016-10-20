import Layout from '../../../../lib/layout';
import template from '../../templates/list/movie-filter-bar.pug';

export default Layout.extend({
  className: 'movie-filter-bar',
  template: template,
  events: {
    'click #look-up': 'lookUp'
  },
  lookUp() {
    this.trigger('look-up', true);
  }
});