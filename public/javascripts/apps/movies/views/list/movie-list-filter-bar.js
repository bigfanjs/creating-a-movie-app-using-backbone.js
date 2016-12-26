import Layout from '../../../../lib/layout';
import template from '../../templates/list/movie-filter-bar.pug';
import $ from 'jquery';

export default Layout.extend({
  className: 'movie-filter-bar',
  template: template,
  events: {
    'click #look-up': 'lookUp',
    'click #type': 'type',
    'click #sort': 'sort'
  },
  lookUp: function ( e ) {
    e.preventDefault();
    this.trigger('look-up', $('#search').val());
  }
});