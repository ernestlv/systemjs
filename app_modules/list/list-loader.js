define([
  "loader",
  "/app_modules/header/header-loader.js",
  "/app_modules/footer/footer-loader.js",
  "/app_modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {
      console.log("List Loader created!");

      var module = loader.request_module({
        id:'module-list',
        htmlURL: '/app_modules/list/list.html',
        cssURL: '/app_modules/list/list.css',
        modelURL: '/app_modules/list/list.js',
        elSelector: '#app-content'
      });

      return loader.request_render([header, footer, menu, module]);

});
