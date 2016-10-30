import Layout from '../../../lib/layout';

const template = function () {
  return '<div class="movie-viewer-widget"></div>' +
    '<div class="movie-viewer-about"></div>';
};

module.exports = Layout.extend({
  template,
  initialize( options ) {
    Layout.prototype.initialize.call(this, options);
  },
  regions: {
    widget: '.movie-viewer-widget',
    about: '.movie-viewer-about',
  }
});