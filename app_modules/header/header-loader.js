define([
  "loader"
], function(loader) {

      console.log("Executing Header Loader...");

      return loader.request_module({
        id: 'module-header',
        htmlURL: '/app_modules/header/header.html',
        cssURL: '/app_modules/header/header.css',
        viewModelURL: '/app_modules/header/header.js'
      });

});
