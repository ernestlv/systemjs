define([
  "loader"
], function(loader) {

      console.log("Executing Menu Loader...");

      var module = loader.request_module({
        id:'app-menu',
        htmlURL: '/app_modules/menu/menu.html',
        cssURL: '/app_modules/menu/menu.css',
        //modelURL: '/app_modules/menu/menu.js',
        elSelector: '#app-menu'
      });

      return loader.request_render([module]);
});
