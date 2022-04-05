define([
  "loader",
  "/modules/header/header-loader.js",
  "/modules/footer/footer-loader.js",
  "/modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {
      console.log("List Loader created!");

      var module = loader.request_module({
        htmlURL: '/modules/list/list.html',
        cssURL: '/modules/list/list.css',
        modelURL: '/modules/list/list.js',
        elSelector: '.module-content'
      });

      return loader.request_render([header, footer, menu, module]);

});
