define([
  "loader"
], function(loader) {

      console.log("Nested Loader created!");

      return loader.load_module({
        htmlURL: '/modules/nested/nested.html',
        cssURL: '/modules/nested/nested.css',
        modelURL: '/modules/nested/nested.js',
        elSelector: '#module-nested'
      });
});
