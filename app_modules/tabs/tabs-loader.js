define([
  "loader"
], function(loader, header, footer, menu) {

      console.log("Executing Tabs Loader...");

      return loader.request_module({
        id: 'module-tabs',
        htmlURL: '/app_modules/tabs/tabs.html',
        cssURL: '/app_modules/tabs/tabs.css',
        viewModel: {
          url:'/app_modules/tabs/tabs.js',
          args:[
            {
              id:'module-tab-one',
              htmlURL:"/app_modules/tabs/tab-one/tab-one.html",
              viewModelURL:"/app_modules/tabs/tab-one/tab-one.js"
            },
            {
              id:'module-tab-two',
              htmlURL:"/app_modules/tabs/tab-two/tab-two.html",
              viewModelURL:"/app_modules/tabs/tab-two/tab-two.js"
            },
            {
              id:'module-tab-three',
              htmlURL:"/app_modules/tabs/tab-three/tab-three.html",
              viewModelURL:"/app_modules/tabs/tab-three/tab-three.js"
            }
          ]
        }
      });

});
