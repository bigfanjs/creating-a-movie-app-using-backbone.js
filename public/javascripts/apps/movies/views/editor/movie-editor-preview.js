import $ from 'jquery';
import ModelView from '../../../../model-view';
import template from '../../templates/movie-editor-preview.pug';

export default ModelView.extend({
  template,
  className: 'movie-editor-preview',
  events: {
    'click img': 'selectFileDialog',
    'change #avatar': 'handleFileSelect'
  },
  selectFileDialog: function () {
    $('#avatar').trigger('click');
  },
  handleFileSelect: function ( e ) {
    e.preventDefault();

    const
      img = this.$('img.avatar'),
      selectedFile = this.$('#avatar')[0].files[0],
      fileReader = new FileReader();

    fileReader.onload = function ( e ) {
      const url = e.target.result;

      img.attr('src', url);
    };

    fileReader.readAsDataUrl( selectedFile );
    this.trigger('avatar:selected', selectedFile);
  }
});