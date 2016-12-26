import ModelView from '../../../../lib/model-view';
import template from '../../templates/list/movie-list-item-view.pug';
import App from '../../../../app';

export default ModelView.extend({
  template,
  className: 'col-md-3',
  events: {
    'click #movie-item': 'viewMovie'
  },
  viewMovie() {
    const id = this.model.get('_id');
    App.router.navigate(`movies/view/:${ id }`, true);
  }
});