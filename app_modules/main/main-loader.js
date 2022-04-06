define([
  "loader"
], function(loader, header, footer, menu) {
      console.log("2 Executing Main Loader...");

      return loader.request_module({
        id:'module-main',
        htmlURL: '/app_modules/main/main.html',
        cssURL: '/app_modules/main/main.css',
        //modelURL: '/app_modules/main/main.js',
        elSelector: '#app-content'
      });

});
