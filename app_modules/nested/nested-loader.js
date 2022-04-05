define([
  "loader",
  "/app_modules/header/header-loader.js",
  "/app_modules/footer/footer-loader.js",
  "/app_modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {

      console.log("Executing Nested Loader...");

      var module = loader.request_module({
        id: 'module-nested',
        htmlURL: '/app_modules/nested/nested.html',
        cssURL: '/app_modules/nested/nested.css',
        modelURL: '/app_modules/nested/nested.js',
        elSelector: '#app-content'
      });

      return loader.request_render([header, footer, menu, module]);
});
