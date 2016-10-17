import Backbone from 'backbone';
import bind from 'lodash/bind';
import forEch from 'lodash/forEch';
import isFunction from 'lodash/isFunction';

const
  /*
    Renders each new model added to
    the collection.
  */
  modelAdded = function ( childViews, model ) {
    const view = renderModel( childViews, model );

    // let the rendered model appears to the end user.
    this.$el.append( view.el );
  },
  modelRemoved = function ( childViews, model ) {
    const view = childViews[ model.cid ];
    closeChildView( childViews, view );
  },
  /*
    This function is given the model and it
    renders it for generating a new view.
    Which is added to a list of child views
    and is registered for all events.
  */
  renderModel = function ( childViews, model ) {
    const view = new this.ItemView({ model });

    childViews[ model.cid ] = view;

    this.listenTo(view, 'all', ( eventName, model ) => {
      this.trigger(`item:${ eventName }`, view, model);
    });

    view.render();

    return view;
  },
  closeChildViews = function ( childViews ) {
    childViews.forEach(view => {
      closeChildView( view, childViews );
    });
  },
  closeChildView = function ( view, childViews ) {
    if ( typeof view === 'undefined' ) {
      throw TypeError('no view is specified');
    }

    if ( isFunction( view.remove ) ) {
      view.remove();
    }

    this.stopListening( view );

    delete childViews[ view.model.cid ];
  };

export default Backbone.View.extend({
  initialize() {
    const childViews = this.childViews = {};

    this.listenTo(
      this.collection,
      'add',
      bind( modelAdded, this, childViews)
    );
    this.listenTo(
      this.collection,
      'remove',
      bind(modelRemoved, this, childViews)
    );
    this.listenTo(this.collection, 'reset', this.render);
  },
  render() {
    var $html;

    this.closeChildViews( this.childViews );

    $html = this.collection.slice(0).map(model => {
      const view = renderModel.call( this, model );

      return view.$el;
    });

    this.$el.html( $html );

    return this;
  },
  remove() {
    Backbone.View.prototype.remove.call( this );
    closeChildViews( this.childViews );
  }
});