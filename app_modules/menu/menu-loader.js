define([
  "loader"
], function(loader) {

      console.log("Executing Menu Loader...");

      return loader.request_module({
        id:'app-menu',
        htmlURL: '/app_modules/menu/menu.html',
        cssURL: '/app_modules/menu/menu.css'
        //viewModelURL: '/app_modules/menu/menu.js'
      });

});
