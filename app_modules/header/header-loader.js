define([
  "loader"
], function(loader) {

      console.log("Executing Header Loader...");

      var module = loader.request_module({
        id: 'app-header',
        htmlURL: '/app_modules/header/header.html',
        cssURL: '/app_modules/header/header.css',
        //modelURL: '/app_modules/header/header.js',
        elSelector: '#app-header'
      });

      return loader.request_render([module]);

});
