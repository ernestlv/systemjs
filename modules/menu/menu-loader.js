define([
  "loader"
], function(loader) {

      console.log("Executing Menu Loader...");

      var module = loader.request_module({
        htmlURL: '/modules/menu/menu.html',
        cssURL: '/modules/menu/menu.css',
        //modelURL: '/modules/menu/menu.js',
        elSelector: '#module-menu'
      });

      return loader.request_render([module]);
});
