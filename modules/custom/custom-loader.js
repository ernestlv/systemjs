define([
  "loader",
  "/modules/header/header-loader.js",
  "/modules/footer/footer-loader.js",
  "/modules/menu/menu-loader.js"
], function(loader) {

      console.log("Custom Loader created!");

      var module = loader.request_module({
        htmlURL: '/modules/custom/custom.html',
        cssURL: '/modules/custom/custom.css',
        modelURL: '/modules/custom/custom.js',
        elSelector: '.module-content'
      });

      return loader.request_render([module]);
});
