import Backbone from 'backbone';
import DashboardLayout from '../views/list/dashboard-layout';
import DashboardNavbar from '../views/list/dashboard-navbar';
import DashboardFilterBar from '../views/list/dashboard-filter-bar';
import DashboardView from '../views/list/dashboard-view';

export default {
  setup: function (options = {}) {
    const ctrl = Object.create( this );

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view: function ( collection ) {
    const
      layout = new DashboardLayout(),
      navbar = new DashboardNavbar(),
      filter = new DashboardFilterBar(),
      list = new DashboardView({ collection });

    this.region.show( layout );
    layout.getRegion('filters').show( filter );
    layout.getRegion('navbar').show( navbar );
    layout.getRegion('list').show(list, true);

    this.listenTo(filter, 'lookup', function (title) {
      const
        filtered = collection.filter(movie => {
          return movie.get('title').match(new RegExp(title, 'i'));
        }),
        list = new DashboardView({
          collection: new Backbone.Collection( filtered )
        });

      layout
        .getRegion('list')
        .show( list );
    });
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};