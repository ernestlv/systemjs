define([
  "loader",
  "/app_modules/header/header-loader.js",
  "/app_modules/footer/footer-loader.js",
  "/app_modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {

      console.log("Executing Tabs Loader...");

      var module = loader.request_module({
        id: 'module-tabs',
        htmlURL: '/app_modules/tabs/tabs.html',
        cssURL: '/app_modules/tabs/tabs.css',
        modelURL: {
          url:'/app_modules/tabs/tabs.js',
          args:[
            {
              id:'module-tab-one',
              index:0,
              label:"one",
              htmlURL:"/app_modules/tabs/tab-one/tab-one.html",
              modelURL:"/app_modules/tabs/tab-one/tab-one.js",
              elSelector:"#module-tab-one"
            },
            {
              id:'module-tab-two',
              index:1,
              label:"two",
              htmlURL:"/app_modules/tabs/tab-two/tab-two.html",
              modelURL:"/app_modules/tabs/tab-two/tab-two.js",
              elSelector:"#module-tab-two"
            },
            {
              id:'module-tab-three',
              index:2,
              label:"three",
              htmlURL:"/app_modules/tabs/tab-three/tab-three.html",
              modelURL:"/app_modules/tabs/tab-three/tab-three.js",
              elSelector:"#module-tab-three"
            }
          ]
        },
        elSelector: '#app-content'
      });

      return loader.request_render([module]);

});
