/* Proxyquireify forces us to write CommonJS modules */

const
  Backbone = require('backbone'),
  MovieListLayout = require('../views/list/movie-list-layout'),
  MovieListFilterBar = require('../views/list/movie-list-filter-bar'),
  MovieListItemView = require('../views/list/movie-list-item-view'),
  MovieListView = require('../views/list/movie-list-view');

module.exports = {
  setup: function (options = {}) {
    const ctrl = Object.create( this );

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view: function ( collection ) {
    const
      layout = new MovieListLayout(),
      filter = new MovieListFilterBar(),
      list = new MovieListView({ collection });

    this.region.show( layout );
    layout.getRegion('filters').show( filter );
    layout.getRegion('list').show( list );
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};