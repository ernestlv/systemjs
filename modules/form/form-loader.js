define([
  "loader",
  "/modules/header/header-loader.js",
  "/modules/footer/footer-loader.js",
  "/modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {

      console.log("Executing Form Loader...");

      var module = loader.request_module({
        htmlURL: '/modules/form/form.html',
        cssURL: '/modules/form/form.css',
        modelURL: '/modules/form/form.js',
        elSelector: '.module-content'
      });

      return loader.request_render([header, footer, menu, module]);

});
