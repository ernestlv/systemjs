define([
  "app"
], function(app, header, footer, menu) {

      console.log("Executing Nested Loader...");

      return app.request_module({
        id: 'module-nested',
        htmlURL: '/app_modules/nested/nested.html',
        cssURL: '/app_modules/nested/nested.css',
        viewModelURL: '/app_modules/nested/nested.js'
      });

});
