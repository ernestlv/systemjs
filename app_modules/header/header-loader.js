define([
  "loader"
], function(loader) {

      console.log("Executing Header Loader...");

      var module = loader.request_module({
        htmlURL: '/app_modules/header/header.html',
        cssURL: '/app_modules/header/header.css',
        //modelURL: '/app_modules/header/header.js',
        elSelector: '#module-header'
      });

      return loader.request_render([module]);

});
