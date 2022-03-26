define([
  "loader"
], function(loader) {

      console.log("Header Loader created!");

      return loader.load_module({
        htmlURL: '/modules/header/header.html',
        cssURL: '/modules/header/header.css',
        //modelURL: '/modules/header/header.js',
        elSelector: '#module-header'
      });

});
