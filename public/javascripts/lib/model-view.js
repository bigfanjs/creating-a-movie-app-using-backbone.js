import Backbone from 'backbone';
import Stickit from 'backbone.stickit';

// This is responsible for rendring models
const render = function () {
  const
    model = this.model ? this.model.toJSON() : {},
    html = this.template( model );

  /* replace the contents of the element by
    a peice of HTML which is genreated by
    the template. */
  this.$el.html( html );

  /* if the model exists, we need to stick the model
    to the view for two-way data bindings. */
  if ( this.model ) this.stickit();

  if ( this.onRender ) this.onRender();

  return this;
};

export default Backbone.View.extend({
  render
});