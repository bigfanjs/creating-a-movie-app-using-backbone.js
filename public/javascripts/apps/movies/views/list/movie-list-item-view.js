import ModelView from '../../../../lib/model-view';
import template from '../../templates/list/movie-list-item-view.pug';

export default ModelView.extend({
  template,
  className: 'col-xs-12 col-sm-6 col-md-3',
  events: {
    'click #movie-item': 'viewMovie'
  },
  viewMovie() {
    //navigate to the right URL.
  }
});