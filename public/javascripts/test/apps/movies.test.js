const proxyquire = require('proxyquireify')( require );

// requiring dependencies.
const
  jQuery = require('jquery'),
  Backbone = require('backbone'),
  sinon = require('sinon');

const stub = {
  './collections/movie-collection': Backbone.Collection,
  './models/movie-model': Backbone.Model,
  './controllers/list': {},
  './controllers/viewer': {}
};

const MoviesApp = proxyquire('../../apps/movies', stub);

describe('showing movie list', function () {
  var stub;

  beforeEach(function () {
    const fetch = () => {};
    stub = sinon.stub(Backbone.Collection.prototype, 'fetch', fetch);
  });

  it('should fetch the data from the server', function () {
    MoviesApp.setup().viewList();

    assert.ok(stub.calledOnce);
  });
});

describe('showing movie list item', function () {
  var stub;

  beforeEach(function () {
    const fetch = () => {};
    stub = sinon.stub(Backbone.Model.prototype, 'fetch', fetch);
  });

  it('should fetch the data from the server', function () {
    MoviesApp.setup().viewMovie();

    assert.ok(stub.calledOnce);
  });
});