import ModelView from '../../../../lib/model-view';
import template from '../../templates/list/dashboard-item.pug';
import App from '../../../../app';

function getDate(date) {
  return new Date(date).toLocaleDateString();
}

export default ModelView.extend({
  template,
  tagName: 'tr',
  events: {
    'click #delete': 'removeMovie',
    'click #edit': 'editMovie'
  },
  bindings: {
    '#created-at': {
      observe: 'createdAt',
      onGet(date) {
        return getDate(date);
      }
    },
    '#updated-at': {
      observe: 'updatedAt',
      onGet(date) {
        return getDate(date);
      }
    }
  },
  removeMovie: function () {
    this.trigger('delete:movie', this.model);
  },
  editMovie: function () {
    const id = this.model.get('_id');
    App.router.navigate(`movies/edit/${id}`, true);
  },
});