define([
  "loader"
], function(loader) {

      console.log("Executing Tabs Loader...");

      return loader.request_module({
        id: 'module-tabs-3',
        htmlURL: '/app_modules/tabs3/tabs.html',
        cssURL: '/app_modules/tabs3/tabs.css',
        viewModel: {
          url:'/app_modules/tabs3/tabs.js'
        }
      });

});
