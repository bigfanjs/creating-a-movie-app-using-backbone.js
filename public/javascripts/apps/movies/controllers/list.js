/* Proxyquireify forces us to write CommonJS modules */

/*const
  Backbone = require('backbone'),
  MovieListLayout = require('../views/list/movie-list-layout'),
  MovieListFilterBar = require('../views/list/movie-list-filter-bar'),
  MovieListItemView = require('../views/list/movie-list-item-view'),
  MovieListView = require('../views/list/movie-list-view');*/

import $ from 'jquery';
import Backbone from 'backbone';
import MovieListLayout from '../views/list/movie-list-layout';
import MovieListFilterBar from '../views/list/movie-list-filter-bar';
import MovieListView from '../views/list/movie-list-view';
import MoviePagBar from '../views/list/movie-pag-bar';

export default {
  setup: function (options = {}) {
    const ctrl = Object.create( this );

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view: function (collection, page) {
    const
      layout = new MovieListLayout(),
      filter = new MovieListFilterBar(),
      list = new MovieListView({ collection });

    this.region.show( layout );
    layout.getRegion('filters').show( filter );
    layout.getRegion('list').show( list );

    $.get('/api/movies/count')
      .done(count => {
        const pagBar = new MoviePagBar({count, page});

        layout.getRegion('page').show(pagBar);
      })
      .fail(err => {
        console.error(err);
      });

    this.listenTo(filter, 'lookup', function (title) {
      const
        filtered = collection.filter(movie => {
          return movie.get('title').match(new RegExp(title, 'i'));
        }),
        list = new MovieListView({
          collection: new Backbone.Collection( filtered )
        });

      layout
        .getRegion('list')
        .show( list );
    });
    this.listenTo(filter, 'filter', function ( queryString ) {
      $.get('/api/movies?' + queryString)
        .done(data => {
          const list = new MovieListView({
            collection: new Backbone.Collection( data )
          });

          layout.getRegion('list').show( list );
        })
        .fail(err => {
          console.error( err );
        });
    });
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};