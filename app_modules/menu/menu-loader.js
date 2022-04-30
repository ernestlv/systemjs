define([
  "loader"
], function(loader) {

      console.log("Executing Menu Loader...");

      var modulePromise = loader.request_module({
        id:'module-menu',
        htmlURL: '/app_modules/menu/menu.html',
        cssURL: '/app_modules/menu/menu.css',
        viewModelURL: '/app_modules/menu/menu.js'
      });

      return modulePromise;
});
