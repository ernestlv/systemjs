define([
  "loader"
], function(loader) {

      console.log("Custom Loader created!");

      return loader.load_module({
        htmlURL: '/modules/custom/custom.html',
        cssURL: '/modules/custom/custom.css',
        modelURL: '/modules/custom/custom.js',
        elSelector: '#module-custom'
      });
});
