define([
  "app"
], function(app) {

      console.log("Executing Header Loader...");

      return app.request_module({
        id: 'app-header',
        htmlURL: '/app_modules/header/header.html',
        cssURL: '/app_modules/header/header.css'
        //viewModelURL: '/app_modules/header/header.js'
      });

});
