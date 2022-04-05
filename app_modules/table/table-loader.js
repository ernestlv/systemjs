define([
  "loader",
  "/app_modules/header/header-loader.js",
  "/app_modules/footer/footer-loader.js",
  "/app_modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {
      console.log("Executing Table Loader...");

      var module = loader.request_module({
        htmlURL: '/app_modules/table/table.html',
        cssURL: '/app_modules/table/table.css',
        modelURL: '/app_modules/table/table.js',
        elSelector: '.module-content'
      });

      return loader.request_render([header, footer, menu, module]);
});
