import ModelView from '../../../../lib/model-view';

export default ModelView.extend({
  tagName: 'a',
  className: 'btn btn-default',
  events: {
    'click #page': 'selectPage'
  },
  selectPage(e) {
    e.preventDefault();
  }
});