import $ from 'jquery';
import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-preview.pug';

export default ModelView.extend({
  template,
  className: 'col-xs-12 col-sm-4 col-md-3',
  events: {
    'click img': 'selectFileDialog',
    'change #cover-input': 'handleFileSelect'
  },
  selectFileDialog: function () {
    $('#cover-input').trigger('click');
  },
  handleFileSelect: function ( e ) {
    e.preventDefault();

    const
      img = this.$('img#cover-img'),
      selectedFile = this.$('#cover-input')[0].files[0],
      fileReader = new FileReader();

    fileReader.onload = function ( e ) {
      const url = e.target.result;

      img.attr('src', url);
    };

    fileReader.readAsDataURL( selectedFile );
    this.trigger('cover:select', selectedFile);
  }
});