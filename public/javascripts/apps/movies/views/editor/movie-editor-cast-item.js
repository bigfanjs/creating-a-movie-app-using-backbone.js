import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-cast-item.pug';

export default ModelView.extend({
  template,
  className: 'form-group',
  events: {
    'click a': 'deleteActor',
    'change #avatar-input': 'handleAvatarSelect'
  },
  deleteActor( e ) {
    e.preventDefault();
    this.trigger('actor:delete', this.model);
  },
  handleAvatarSelect( e ) {
    e.preventDefault();

    const
      img = this.$('#img-avatar'),
      selectedFile = this.$('#avatar-input')[0].files[0],
      fileReader = new FileReader();

    fileReader.onload = function ( event ) {
      const url = event.target.result;

      img.attr('src', url);
    };

    fileReader.readAsDataURL( selectedFile );
    this.trigger('avatar:select', selectedFile);
  }
});