define([
  "loader",
  "/app_modules/header/header-loader.js",
  "/app_modules/footer/footer-loader.js",
  "/app_modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {
      console.log("2 Executing Main Loader...");

      var module = loader.request_module({
        htmlURL: '/app_modules/main/main.html',
        cssURL: '/app_modules/main/main.css',
        //modelURL: '/app_modules/main/main.js',
        elSelector: '.module-content'
      });

      return loader.request_render([header, footer, menu, module]);
});
