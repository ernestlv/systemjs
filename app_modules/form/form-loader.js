define([
  "loader"
], function(loader) {

      console.log("Executing Form Loader...");

      return loader.request_module({
        id:'module-form',
        htmlURL: '/app_modules/form/form.html',
        cssURL: '/app_modules/form/form.css',
        viewModelURL: '/app_modules/form/form.js'
      });

});
