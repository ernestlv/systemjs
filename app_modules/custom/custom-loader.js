define([
  "app"
], function(app) {

      console.log("Custom Loader created!");

      return app.request_module({
        id:'module-custom',
        htmlURL: '/app_modules/custom/custom.html',
        cssURL: '/app_modules/custom/custom.css',
        viewModelURL: '/app_modules/custom/custom.js'
      });

});
