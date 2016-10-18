import Backbone from 'backbone';
import MovieListItemView from '../../apps/movies/views/list/movie-list-item-view';

const assert = chai.assert;

describe('Movie List Item View', function () {
  beforeEach(function () {
    // seting a fake model.
    this.model = new Backbone.Model({
      name: 'someName',
      type: 'funny',
      runningTime: '2h30, min'
    });
  });

  it('has the right class', function () {
    const
      view = new MovieListItemView({ model: this.model }),
      className = 'col-xs-12 col-sm-6 col-md-3';

    assert.equal(view.className, className);
  });

  it('in sync with the model', function () {
    const view = new MovieListItemView({ model: this.model });

    view.render();
    assert.include(view.$el.html(), this.model.get('name'));
    assert.include(view.$el.html(), this.model.get('type'));
    assert.include(view.$el.html(), this.model.get('runningTime'));
  });
});