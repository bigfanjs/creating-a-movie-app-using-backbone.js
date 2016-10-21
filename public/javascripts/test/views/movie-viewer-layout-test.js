import MovieViewerLayout from '../../apps/movies/views/viewer/movie-viewer-layout.js';

const assert = chai.assert;

describe('Movie Viewer Layout', function () {
  it('has the right class name', function () {
    const layout = new MovieViewerLayout();

    assert.match(layout.className, /row\spage-container/);
  });
  it('has a template', function () {
    const layout = new MovieViewerLayout();

    assert.typeOf(layout.template, 'function');
  });
  it('has the right regions', function () {
    const
      layout = new MovieViewerLayout(),
      regions = {
        widget: '.movie-widget',
        about: '.about-container'
      };

    assert.deepEqual(layout.regions, regions);
  });
});