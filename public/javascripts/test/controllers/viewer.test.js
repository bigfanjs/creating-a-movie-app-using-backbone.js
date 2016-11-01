const proxyquire = require('proxyquireify')( require );

// requiring dependencies.
const
  Backbone = require('backbone'),
  sinon = require('sinon');

// requiring fake objects.
const
  FakeLayout = require('./fakes/fake-viewer-layout'),
  FakeRegion = require('./fakes/fake-region');

const assert = chai.assert;

// faking movie viewer dependencies.
const stubs = {
  '../views/viewer/movie-viewer-layout': FakeLayout,
  '../views/viewer/movie-viewer-about': Backbone.View,
  '../views/viewer/movie-viewer-widget': Backbone.View
};

const MovieViewer = proxyquire('../../apps/movies/controllers/viewer',
  stubs);

describe('viewing the movie viewer', function () {
  var region, movie;

  beforeEach(function () {
    region = FakeRegion.setup();

    movie = new Backbone.Model({
      title: 'Titanic',
      type: 'Romantic',
      runningTime: '197mins'
    });
  });

  it('renders the movie viewer in the given region', function () {
    const
      getRegion = () => FakeRegion.setup(),
      stub = sinon.stub(FakeLayout.prototype, 'getRegion', getRegion);

    // initializing the tested behavior.
    MovieViewer.setup({ region }).view( movie );

    // making sure the layout is rendered in the given region.
    assert.ok(region.stub.calledOnce);

    // making sure layout's getRegion called twice.
    assert.ok(stub.calledTwice);

    // making sure getRegion() first call passed "widget" arg.
    assert.ok(stub.getCall( 0 ).args[ 0 ], /^widget/);

    // making sure getRegion() second call passed "about" arg.
    assert.ok(stub.getCall( 1 ).args[ 0 ], /^about/);

    /* making sure the "widget" view is rendered in layout's
       "widget" region*/
    assert.ok(stub.getCall( 0 ).returnValue.stub.calledOnce);

    /* making sure the "about" view is rendered in layout's
       "about" region*/
    assert.ok(stub.getCall( 1 ).returnValue.stub.calledOnce);
  });
});

describe('removing the movie viewer', function () {
  var region, remove;

  beforeEach(function () {
    region = FakeRegion.setup();
    remove = sinon.spy(region, 'remove');
  });

  it('has to destroy the entire region', function () {
    MovieViewer.setup({ region }).destroy();

    assert.ok( remove.calledOnce );
  });

  it('has to stop listening to the viewer\'s events', function () {
    const stopListening = sinon.spy();

    MovieViewer.setup({ region, stopListening }).destroy();

    assert.ok(stopListening.calledOnce);
  });
});