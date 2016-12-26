import Backbone from 'backbone';
import bind from 'lodash/bind';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';

const
  /* Renders each new model added to
    the collection. */
  modelAdded = function ( model ) {
    const view = renderModel.call(this, model, this.childViews);

    // let the rendered model appears to the end user.
    this.$el.append( view.el );
  },
  modelRemoved = function ( model ) {
    const view = this.childViews[ model.cid ];
    this.closeChildView(view);
  },

  /* This function is given the model and it
    renders it for generating a new view.
    Which is added to a list of child views
    and is registered for all events. */
  renderModel = function (model, childViews) {
    const view = new this.MovieItem({ model });

    childViews[ model.cid ] = view;

    this.listenTo(view, 'all', ( eventName, model ) => {
      this.trigger(`item:${ eventName }`, view, model);
    });

    view.render();

    return view;
  };

const
  CollectionView = Backbone.View.extend({
    initialize() {
      this.childViews = {};

      this.listenTo(this.collection, 'add', bind(modelAdded, this));
      this.listenTo(this.collection, 'remove', bind(modelRemoved, this));
      this.listenTo(this.collection, 'reset', this.render);
    },
    render() {
      var $html;

      this.closeChildViews();

      $html = this.collection.slice(0).map(model => {
        const view = renderModel.call(this, model, this.childViews);

        return view.$el;
      });

      this.$el.html( $html );

      return this;
    },
    remove() {
      Backbone.View.prototype.remove.call(this);
      this.closeChildViews();
    },
    closeChildViews() {
      const views = this.childViews || {};
      // console.log('Ass', views);

      forEach(views, view => {
        this.closeChildView( view );
      });
    },
    closeChildView: function ( view ) {
      if (typeof view === 'undefined') {
        throw TypeError('no view is specified');
      }

      if (isFunction( view.remove )) {
        view.remove();
      }

      this.stopListening( view );

      delete this.childViews[ view.model.cid ];
    }
  });

export default CollectionView;