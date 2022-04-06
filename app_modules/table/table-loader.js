define([
  "loader"
], function(loader, header, footer, menu) {
      console.log("Executing Table Loader...");

      return loader.request_module({
        id: 'module-table',
        htmlURL: '/app_modules/table/table.html',
        cssURL: '/app_modules/table/table.css',
        modelURL: '/app_modules/table/table.js',
        elSelector: '#app-content'
      });

});
