define([
  "loader"
], function(loader) {

      console.log("Executing Menu Loader...");

      return loader.request_module({
        id:'module-ko',
        htmlURL: '/app_modules/ko/ko.html',
        cssURL: '/app_modules/ko/ko.css',
        viewModelURL: '/app_modules/ko/ko.js'
      });

});
