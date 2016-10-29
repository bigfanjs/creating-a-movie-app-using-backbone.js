const
  sinon = require('sinon'),
  isFunction = require('lodash/isFunction');

module.exports = {
  setup() {
    const obj = Object.create( this );

    obj.stub = sinon.spy(obj, 'show');

    return obj;
  },
  show( view ) {
    view.render();
  },
  remove() {}
};