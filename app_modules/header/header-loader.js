define([
  "loader"
], function(loader) {

      console.log("Executing Header Loader...");

      return loader.request_module({
        id: 'app-header',
        htmlURL: '/app_modules/header/header.html',
        cssURL: '/app_modules/header/header.css',
        //modelURL: '/app_modules/header/header.js',
        elSelector: '#app-header'
      });

});
