define([
  "loader",
  "/app_modules/header/header-loader.js",
  "/app_modules/footer/footer-loader.js",
  "/app_modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {

      console.log("Executing Form Loader...");

      var module = loader.request_module({
        id:'module-form',
        htmlURL: '/app_modules/form/form.html',
        cssURL: '/app_modules/form/form.css',
        modelURL: '/app_modules/form/form.js',
        elSelector: '#app-content'
      });

      return loader.request_render([header, footer, menu, module]);

});
