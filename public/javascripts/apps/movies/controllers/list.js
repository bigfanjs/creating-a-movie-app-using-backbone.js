/*
  We better use CommonJS modules for testing controllers
  since proxyquireify doesn't work properly with ES6
  modules.
*/

const
  Backbone = require('backbone'),
  MovieListLayout = require('../views/list/movie-list-layout'),
  MovieListFilterBar = require('../views/list/movie-list-filter-bar'),
  MovieListItemView = require('../views/list/movie-list-item-view'),
  MovieListView = require('../views/list/movie-list-view');

const deleteMovie = function ( view, movie ) {
  movie.destroy({
    success: function () {
      console.log('Movie deleted');
    },
    error: function () {
      console.log('deleting movie [error]');
    }
  });
};

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

    this.listenTo(list, 'item:delete:movie', deleteMovie);
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};