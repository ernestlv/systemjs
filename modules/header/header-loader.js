define([
  "loader"
], function(loader) {

      console.log("Executing Header Loader...");

      var module = loader.request_module({
        htmlURL: '/modules/header/header.html',
        cssURL: '/modules/header/header.css',
        //modelURL: '/modules/header/header.js',
        elSelector: '#module-header'
      });

      return loader.request_render([module]);

});
