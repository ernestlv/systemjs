define([
  "app"
], function(app, header, footer, menu) {
      console.log("2 Executing Main Loader...");

      return app.request_module({
        id:'module-main',
        htmlURL: '/app_modules/main/main.html',
        cssURL: '/app_modules/main/main.css'
        //viewModelURL: '/app_modules/main/main.js'
      });

});
