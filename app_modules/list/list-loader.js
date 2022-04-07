define([
  "app"
], function(app, header, footer, menu) {
      console.log("List Loader created!");

      return app.request_module({
        id:'module-list',
        htmlURL: '/app_modules/list/list.html',
        cssURL: '/app_modules/list/list.css',
        viewModelURL: '/app_modules/list/list.js'
      });

});
