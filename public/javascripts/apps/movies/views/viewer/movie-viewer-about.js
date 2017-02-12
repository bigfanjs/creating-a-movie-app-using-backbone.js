import Layout from '../../../../lib/layout';
import App from '../../../../app';
import template from '../../templates/viewer/movie-viewer-about.pug';

export default Layout.extend({
  initialize(options) {
    this.selectedPage = options.selectedPage;

    this.bindings = {
      '#release-date': {
        observe: 'releaseDate',
        onGet: function (date) {
          return new Date(date).toLocaleDateString();
        }
      },
      '#title > strong': {
        observe: ['releaseDate', 'title'],
        onGet: function (values) {
          const date = new Date(values[0]).getFullYear();

          return values[1] + '('+ date +')';
        }
      }
    };
  },
  template,
  className: 'col-xs-12 col-sm-8 col-md-9',
  regions: {
    cast: '.cast-list-container',
    starring: '.starring-list-container',
  },
  events: {
    'click #goback': 'back',
    'click #watch-movie': 'watchMovie',
    'click #watch-trailer': 'watchTrailer',
    'click #like': 'like',
    'click #dislike': 'dislike'
  },
  back() {
    const page = this.selectedPage;
    App.router.navigate('movies/page/'+page, true);
  },
  watchMovie() {
    // handle movie watching here.
  },
  watchTrailer() {
    // handle trailer watching here.
  },
  like() {
    this.trigger('movie:like', this.model);
  },
  dislike() {
    this.trigger('movie:dislike', this.model);
  },
});