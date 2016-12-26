import $ from 'jquery';
import isFunction from 'lodash/isFunction';

const
    // removes a view from the DOM.
  closeView = function ( view ) {
    if (view && view.remove) {
      view.remove();
    }
  },
  openView = function ( view ) {
    if (!this.$elem) {
      this.$elem = $(this.elem);
    }

    this.$elem.html(view.render().el);
  };

export default {
  // instantiates the Region Object.
  setup( options, init ) {
    const region = Object.assign(
      Object.create( this ),
      options
    );

    if (isFunction( init )) {
      init.call( region );
    }

    return region;
  },
  /* removes the current view in the region and
    opens a new one. */
  show( view ) {
    closeView(this.currView);
    openView.call(this, this.currView=view);
  }
};