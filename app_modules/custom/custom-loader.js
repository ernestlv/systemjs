define([
  "loader",
  "/app_modules/header/header-loader.js",
  "/app_modules/footer/footer-loader.js",
  "/app_modules/menu/menu-loader.js"
], function(loader) {

      console.log("Custom Loader created!");

      var module = loader.request_module({
        htmlURL: '/app_modules/custom/custom.html',
        cssURL: '/app_modules/custom/custom.css',
        modelURL: '/app_modules/custom/custom.js',
        elSelector: '.module-content'
      });

      return loader.request_render([module]);
});
