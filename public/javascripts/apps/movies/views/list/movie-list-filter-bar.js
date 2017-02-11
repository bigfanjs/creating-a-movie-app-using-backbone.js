import Layout from '../../../../lib/layout';
import template from '../../templates/list/movie-filter-bar.pug';
import $ from 'jquery';

export default Layout.extend({
  className: 'well',
  id: 'filter-bar',
  template: template,
  events: {
    'click #look-up': 'lookUp',
    'click #filter': 'filter'
  },
  lookUp: function ( e ) {
    e.preventDefault();
    this.trigger('lookup', $('#search').val());
  },
  filter( e ) {
    e.preventDefault();

    const search = this.$('#filter-form').serialize();

    this.trigger('filter', search);
  }
});