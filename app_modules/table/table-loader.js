define([
  "loader"
], function(loader) {
      console.log("Executing Table Loader...");

      return loader.request_module({
        id: 'module-table',
        htmlURL: '/app_modules/table/table.html',
        cssURL: '/app_modules/table/table.css',
        viewModelURL: '/app_modules/table/table.js'
      });

});
