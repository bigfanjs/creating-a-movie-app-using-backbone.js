import Backbone from 'backbone';
import App from '../../../../app';

export default Backbone.View.extend({
  tagName: 'a',
  className: 'btn',
  events: {
    'click': 'selectPage'
  },
  selectPage(e) {
    e.preventDefault();
    const page = this.model.get('page');
    App.router.navigate(`movies/page/${page}`, true);
  },
  render() {
    const {selectedPage, page} = this.model.attributes;

    const className = selectedPage == page ?
      'btn-primary' : 'btn-default';

    this.$el
      .text(page)
      .addClass(className);

    return this;
  }
});