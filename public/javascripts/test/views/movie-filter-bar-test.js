import sinon from 'sinon';
import MovieFilter from '../../apps/movies/views/list/movie-list-filter-bar';

const assert = chai.assert;

describe('Movie filter bar', function () {
  it('has the right class name', function () {
    const view = new MovieFilter();

    assert.equal(view.className, 'movie-filter-bar');
  });
  it('has the right template', function () {
    const view = new MovieFilter();

    assert.typeOf(view.template, 'function');
  });
  it('triggers look-up event when search button is clicked', function () {
    const
      view = new MovieFilter(),
      callback = sinon.spy();

    view.on('look-up', callback);
    view.render();

    view.$el.find('#look-up').trigger('click');

    assert.ok( callback.called );
  });
});