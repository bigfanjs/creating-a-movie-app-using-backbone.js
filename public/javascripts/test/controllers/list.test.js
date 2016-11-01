const proxyquire = require('proxyquireify')( require );

// requiring dependencies.
const
  Backbone = require('backbone'),
  sinon = require('sinon');

// requiring fake objects.
const
  FakeRegion = require('./fakes/fake-region'),
  FakeLayout = require('./fakes/fake-list-layout');

const assert = chai.assert;

const stubs = {
  '../views/list/movie-list-layout': FakeLayout,
  '../views/list/movie-list-filter-bar': Backbone.View,
  '../views/list/movie-list-item-view': Backbone.View,
  '../views/list/movie-list-view': Backbone.View
};

const MovieList = proxyquire('../../apps/movies/controllers/list', stubs);

describe('Initiating the list controller', function () {
  it('has setup function', function () {
    assert.typeOf(MovieList.setup, 'function');
  });
  it('has the right region', function () {
    const movieList = MovieList.setup({region: '.list-region'});

    assert.match(movieList.region, /.list-region/i);
  });
});

describe('viewing the list', function () {
  var region;

  beforeEach(function () {
    region = FakeRegion.setup();
  });

  it('renders the list in the given region', function () {
    const
      getRegion = () => FakeRegion.setup(),
      stub = sinon.stub(FakeLayout.prototype, 'getRegion', getRegion);

    // initializing the tested behavior.
    MovieList.setup({ region }).view();

    // making sure the layout is rendered in the given region.
    assert.ok( region.stub.called );

    // making sure layout's getRegion() was called twice.
    assert.ok( stub.calledTwice );

    // making sure getRegion() first call passed the right arg.
    assert.match(stub.getCall( 0 ).args[ 0 ], /^filters/);

    // making sure getRegion() second call passed the right arg.
    assert.match(stub.getCall( 1 ).args[ 0 ], /^list/);

    /* making sure the filter view is rendered in the layout's
      filters bar region */
    assert.ok( stub.getCall( 0 ).returnValue.stub.calledOnce );

    /* making sure the movie list view is rendered in the
      layout's list region. */
    assert.ok( stub.getCall( 1 ).returnValue.stub.calledOnce );
  });
});

describe('removing the list', function () {
  var region, remove, movieList;

  beforeEach(function () {
    region = FakeRegion.setup();
    remove = sinon.spy(region, 'remove');
  });

  it('has to destroy the entire region', function () {
    MovieList.setup({ region }).destroy();

    assert.ok( remove.called );
  });

  it('has to stop litening to the given region\'s events', function () {
    const stopListening = sinon.spy();

    MovieList.setup({ region, stopListening }).destroy();

    assert.ok( stopListening.calledOnce );
  });
});