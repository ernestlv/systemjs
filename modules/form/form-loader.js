define([
  "loader"
], function(loader) {

      console.log("Form Loader created!");

      return loader.load_module({
        htmlURL: '/modules/form/form.html',
        cssURL: '/modules/form/form.css',
        modelURL: '/modules/form/form.js',
        elSelector: '#module-form'
      });

});
