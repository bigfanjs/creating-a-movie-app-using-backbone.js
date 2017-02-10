import Backbone from 'backbone';
import ModelView from '../../../../lib/model-view';
import template from '../../templates/editor/movie-editor-cast-item.pug';

export default ModelView.extend({
  initialize() {
    this.bindings = {};

    const attrs = Object.keys(this.model.attributes);

    attrs.forEach(attr => {
      const selector = `#${ attr }-input`;

      if (attr === 'gender') {
        this.bindings[selector] = {
          observe: attr,
          selectOptions: {
            collection: [
              { option: 'Male', value: 'm' },
              { option: 'Female', value: 'f' }
            ],
            labelPath: 'option',
            valuePath: 'value',
            defaultOption: {
              label: 'Gender',
              value: null
            }
          }
        };
      } else if (attr === 'avatar') {
        this.bindings[selector] = {
          attributes: [{
            name: 'src',
            observe: attr,
            onGet(avatar) {
              return avatar ? avatar.url : '/images/actor.png';
            }
          }]
        };
      } else {
        this.bindings[selector] = attr;
      }
    });
  },
  template,
  className: 'form-group',
  events: {
    'click a#delete': 'deleteActor',
    'click i': 'selectFileDialog',
    'change #avatar-input': 'handleAvatarSelect'
  },
  selectFileDialog() {
    this.$('#avatar-input').trigger('click');
  },
  deleteActor( e ) {
    e.preventDefault();

    const index = e.closest('.form-group').index();

    this.trigger('actor:delete', this.model, index);
  },
  handleAvatarSelect( e ) {
    e.preventDefault();

    const
      img = this.$('#img-avatar'),
      index = this.$(e.target).closest('.form-group').index(),
      selectedFile = this.$('#avatar-input')[0].files[0],
      fileReader = new FileReader();

    fileReader.onload = function ( event ) {
      const url = event.target.result;

      img.attr('src', url);
    };

    fileReader.readAsDataURL( selectedFile );
    this.trigger('avatar:select', [selectedFile, index]);
  },
  onRender() {
    Backbone.Validation.bind(this);
  }
});