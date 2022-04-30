define([
  "loader"
], function(loader, header, footer, menu) {
      console.log("Executing Main Loader...");

      return loader.request_module({
        id:'module-main',
        htmlURL: '/app_modules/main/main.html',
        cssURL: '/app_modules/main/main.css',
        viewModelURL: '/app_modules/main/main.js'
      });

});
