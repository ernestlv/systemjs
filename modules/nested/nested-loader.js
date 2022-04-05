define([
  "loader",
  "/modules/header/header-loader.js",
  "/modules/footer/footer-loader.js",
  "/modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {

      console.log("Executing Nested Loader...");

      var module = loader.request_module({
        htmlURL: '/modules/nested/nested.html',
        cssURL: '/modules/nested/nested.css',
        modelURL: '/modules/nested/nested.js',
        elSelector: '.module-content'
      });

      return loader.request_render([header, footer, menu, module]);
});
