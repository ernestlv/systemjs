define([
  "loader",
  "/modules/header/header-loader.js",
  "/modules/footer/footer-loader.js",
  "/modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {
      console.log("Executing Table Loader...");

      var module = loader.request_module({
        htmlURL: '/modules/table/table.html',
        cssURL: '/modules/table/table.css',
        modelURL: '/modules/table/table.js',
        elSelector: '.module-content'
      });

      return loader.request_render([header, footer, menu, module]);
});
