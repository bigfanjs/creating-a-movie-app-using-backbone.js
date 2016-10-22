import MovieViewerWidget from '../../apps/movies/views/viewer/movie-viewer-widget';

const assert = chai.assert;

describe('Movie Viewer Widget', function () {
  it('has the right class name', function () {
    const view = new MovieViewerWidget();

    assert.match( view.className, /movie-viewer-widget/i );
  });
  it('has a template', function () {
    const view = new MovieViewerWidget();

    assert.typeOf(view.template, 'function');
  });
});