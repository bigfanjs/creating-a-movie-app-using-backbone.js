import $ from 'jquery';
import isFunction from 'lodash/isFunction';

const
    // removes a view from the DOM.
  closeView = function ( view ) {
    if (view && view.remove) {
      view.remove();
    }
  },
  openView = function (view, replace) {
    if (!this.$elem) {
      this.$elem = $(this.elem);
    }

    if (replace === true) {
      this.$elem.replaceWith(view.render().el);
    } else {
      this.$elem.html(view.render().el);
    }
  };

export default {
  // instantiates the Region Object.
  setup(options, init) {
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
  show(view, replace) {
    closeView(this.currView);
    openView.call(this, this.currView=view, replace);
  },
  remove() {
    closeView(this.currView);
  }
};