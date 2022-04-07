define([
  "loader"
], function(loader, header, footer, menu) {
      console.log("List Loader created!");

      return loader.request_module({
        id:'module-list',
        htmlURL: '/app_modules/list/list.html',
        cssURL: '/app_modules/list/list.css',
        modelURL: '/app_modules/list/list.js'
      });

});
