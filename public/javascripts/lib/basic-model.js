import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
  upload: function (blob, type, options) {
    const form = new FormData();

    form.append(type, blob);

    $.ajax({
      url: `/api/movies/${ this.get('_id') }/${ type }`,
      method: 'POST',
      data: form,
      success: options.success,
      error: options.error,
      cache: false,
      contentType: false,
      processData: false,
      xhr: function () {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', event => {
          const { length, uploaded } = event;

          options.progress(length, uploaded, uploaded/length);
        }, false);

        return xhr;
      }
    });
  }
});