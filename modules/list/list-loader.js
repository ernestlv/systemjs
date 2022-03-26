define([
  "loader"
], function(loader) {

      console.log("List Loader created!");

      return loader.load_module({
        htmlURL: '/modules/list/list.html',
        cssURL: '/modules/list/list.css',
        modelURL: '/modules/list/list.js',
        elSelector: '#module-list'
      });

});
