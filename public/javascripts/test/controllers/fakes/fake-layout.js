// const Layout = require('../../../lib/layout');

import Layout from '../../../lib/layout';

const template = function () {
  return '<div class="movie-list-filter-bar" ></div>' +
    '<div class="movie-list" ></div>';
};

module.exports = Layout.extend({
  initialize( options ) {
    Layout.prototype.initialize.call(this, options);
  },
  template: template,
  regions: {
    filterBar: '.movie-list-filter-bar',
    movieList: '.movie-list'
  }
});