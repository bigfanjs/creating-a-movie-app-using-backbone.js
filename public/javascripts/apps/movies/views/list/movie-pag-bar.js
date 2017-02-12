import Backbone from 'backbone';
import MoviePagBarItem from './movie-pag-bar-item';

export default Backbone.View.extend({
  initialize(options) {
    this.count = options.count;
    this.selectedPage = options.page;
  },
  className: 'pull-right btn-group',
  render() {
    const pages = Math.ceil(this.count/16);

    var html = [];

    for (let i = 0; i < pages; i++) {
      const
        model = new Backbone.Model({
          page: i+1,
          selectedPage: this.selectedPage
        }),
        page = new MoviePagBarItem({model});

      html.push(page.render().$el);
    }

    this.$el.html( html );

    return this;
  }
});