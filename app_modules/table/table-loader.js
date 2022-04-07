define([
  "app"
], function(app, header, footer, menu) {
      console.log("Executing Table Loader...");

      return app.request_module({
        id: 'module-table',
        htmlURL: '/app_modules/table/table.html',
        cssURL: '/app_modules/table/table.css',
        viewModelURL: '/app_modules/table/table.js'
      });

});
