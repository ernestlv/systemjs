define([
  "loader"
], function(loader) {

      console.log("Executing Tabs Loader...");

      return loader.request_module({
        id: 'module-tabs-2',
        htmlURL: '/app_modules/tabs2/tabs.html',
        cssURL: '/app_modules/tabs2/tabs.css',
        viewModel: {
          url:'/app_modules/tabs2/tabs.js'
        }
      });

});
