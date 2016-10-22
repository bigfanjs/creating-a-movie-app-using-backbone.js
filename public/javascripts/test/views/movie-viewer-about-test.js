import MovieViewerAbout from '../../apps/movies/views/viewer/movie-viewer-about';

const assert = chai.assert;

describe('Movie Viewer About', function () {
  it('has the right className', function () {
    const view = new MovieViewerAbout();

    assert.match(view.className, /panel\spanel-simple/i);
  });
  it('has a template', function () {
    const view = new MovieViewerAbout();

    assert.typeOf(view.template, 'function');
  });
  it('has the regions', function () {
    const
      view = new MovieViewerAbout(),
      regions = {
        actors: '.actor-list-container'
      };

    assert.deepEqual( view.regions, regions );
  });
});