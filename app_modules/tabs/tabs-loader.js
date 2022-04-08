define([
  "app"
], function(app) {

      console.log("Executing Tabs Loader...");

      return app.request_module({
        id: 'module-tabs',
        htmlURL: '/app_modules/tabs/tabs.html',
        cssURL: '/app_modules/tabs/tabs.css',
        viewModel: {
          url:'/app_modules/tabs/tabs.js',
          args:[
            {
              id: 'module-tab-one',
              htmlURL: '/app_modules/table/table.html',
              cssURL: '/app_modules/table/table.css',
              viewModelURL: '/app_modules/table/table.js'
            },
            {
              id:'module-tab-two',
              htmlURL: '/app_modules/form/form.html',
              cssURL: '/app_modules/form/form.css',
              viewModelURL: '/app_modules/form/form.js'
            },
            {
              id:'module-tab-three',
              htmlURL:"/app_modules/tabs/tab-three/tab-three.html",
              cssURL:"/app_modules/tabs/tab-three/tab-three.css",
              viewModelURL:"/app_modules/tabs/tab-three/tab-three.js"
            }
          ]
        }
      });

});
