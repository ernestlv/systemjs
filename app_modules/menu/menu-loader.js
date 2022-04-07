define([
  "app"
], function(app) {

      console.log("Executing Menu Loader...");

      return app.request_module({
        id:'app-menu',
        htmlURL: '/app_modules/menu/menu.html',
        cssURL: '/app_modules/menu/menu.css'
        //viewModelURL: '/app_modules/menu/menu.js'
      });

});
