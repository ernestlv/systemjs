define([
  "loader"
], function(loader) {

      console.log("Menu Loader created!");

      return loader.load_module({
        htmlURL: '/modules/menu/menu.html',
        cssURL: '/modules/menu/menu.css',
        modelURL: '/modules/menu/menu.js',
        elSelector: '#module-menu'
      });

});
