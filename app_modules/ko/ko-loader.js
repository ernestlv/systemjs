define([
  "app"
], function(app) {

      console.log("Executing Menu Loader...");

      return app.request_module({
        id:'app-menu',
        htmlURL: '/app_modules/ko/ko.html',
        cssURL: '/app_modules/ko/ko.css',
        viewModelURL: '/app_modules/ko/ko.js'
      });

});
