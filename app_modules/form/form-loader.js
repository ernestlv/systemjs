define([
  "app"
], function(app, header, footer, menu) {

      console.log("Executing Form Loader...");

      return app.request_module({
        id:'module-form',
        htmlURL: '/app_modules/form/form.html',
        cssURL: '/app_modules/form/form.css',
        viewModelURL: '/app_modules/form/form.js'
      });

});
