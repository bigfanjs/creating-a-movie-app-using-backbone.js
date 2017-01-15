import Backbone from 'backbone';
import values from 'lodash/values';
import Layout from '../../../../lib/layout';
import template from '../../templates/editor/movie-editor-form.pug';

const collections = {
  genre: [
    'Action',
    'Drama',
    'Comedy',
    'Adventure',
    'Romance'
  ],
  country: [
    'America',
    'England',
    'France',
    'China',
    'Germany',
    'India',
    'Spain'
  ],
  language: [
    'English',
    'Frensh',
    'Chinese',
    'German',
    'Indian',
    'Spanish'
  ]
};

export default Layout.extend({
  initialize() {
    this.bindings = {};

    const keys = Object.keys(this.model.attributes);

    keys.splice(keys.indexOf('_id'), 1);

    keys.forEach((key, value) => {
      if (Array.isArray( value )) { return; }

      var arr;

      const selector = `#${ key }-input`;

      if (Array.isArray(arr = collections[key])) {
        const collection = arr.map(item => {
          return { option: item, value: item.toLowerCase() };
        });

        this.bindings[selector] = {
          observe: key,
          selectOptions: { collection,
            labelPath: 'option',
            valuePath: 'value',
            defaultOption: {
              label: '',
              value: null
            }
          }
        };
      } else if (key === 'releaseDate') {
        this.bindings[selector] = {
          observe: key,
          onSet(string) {
            const
              result = {},
              date = Object.keys(this.model.get(key)),
              vals = string.split('/');

            date.forEach((ymd, idx) => {
              const val = vals[ idx ];
              result[ ymd ] = val;
            });

            return result;
          },
          onGet(obj) {
            const vals = values( obj );
            return vals.join('/');
          },
          updateView: !this.model.isNew()
        };
      } else {
        this.bindings[selector] = key;
      }

    });
  },
  template,
  className: 'col-xs-12 col-sm-8 col-md-9',
  events: {
    'click #cancel': 'cancel',
    'click #save': 'save',
    'click #new-actor': 'addActor',
  },
  regions: {
    'cast': '#movie-cast-container'
  },
  cancel: function () {
    this.trigger('form:cancel', this.model);
  },
  save: function ( e ) {
    e.preventDefault();
    this.trigger('form:save', this.model);
  },
  addActor: function () {
    this.trigger('cast:add', true);
  },
  onRender: function () {
    Backbone.Validation.bind(this);
  }
});