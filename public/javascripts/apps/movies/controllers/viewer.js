/* Proxyquireify forces us to write CommonJS modules */

const
  Backbone = require('backbone'),
  MovieViewerLayout = require('../views/viewer/movie-viewer-layout'),
  MovieViewerWidget = require('../views/viewer/movie-viewer-widget'),
  MovieViewerAbout = require('../views/viewer/movie-viewer-about');

module.exports = {
  setup: function ( options ) {
    const ctrl = Object.create( this );

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view( movie ) {
    const
      layout = new MovieViewerLayout(),
      widget = new MovieViewerWidget({ model: movie }),
      about = new MovieViewerAbout({ model: movie });

    this.region.show( layout );
    layout.getRegion('widget').show( widget );
    layout.getRegion('about').show( about );
  },
  destroy() {
    this.region.remove();
    this.stopListening();
  }
};