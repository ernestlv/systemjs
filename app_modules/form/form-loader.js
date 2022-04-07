define([
  "loader"
], function(loader, header, footer, menu) {

      console.log("Executing Form Loader...");

      return loader.request_module({
        id:'module-form',
        htmlURL: '/app_modules/form/form.html',
        cssURL: '/app_modules/form/form.css',
        modelURL: '/app_modules/form/form.js'
      });

});
