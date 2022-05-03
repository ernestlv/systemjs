define([
  "loader"
], function(loader) {

      console.log("Executing Nested Loader...");

      return loader.request_module({
        id: 'module-nested',
        htmlURL: '/app_modules/nested/nested.html',
        cssURL: '/app_modules/nested/nested.css',
        viewModelURL: '/app_modules/nested/nested.js'
      });

});
