define([
  "loader",
  "/modules/header/header-loader.js",
  "/modules/footer/footer-loader.js",
  "/modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {
      console.log("2 Executing Main Loader...");

      var module = loader.request_module({
        htmlURL: '/modules/main/main.html',
        cssURL: '/modules/main/main.css',
        //modelURL: '/modules/main/main.js',
        elSelector: '.module-content'
      });

      return loader.request_render([header, footer, menu, module]);
});
