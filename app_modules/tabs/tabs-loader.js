define([
  "loader",
  "/app_modules/header/header-loader.js",
  "/app_modules/footer/footer-loader.js",
  "/app_modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {

      console.log("Tabs Loader created!");

      var module = loader.request_module({
        htmlURL: '/app_modules/tabs/tabs.html',
        cssURL: '/app_modules/tabs/tabs.css',
        modelURL: {
          url:'/app_modules/tabs/tabs.js',
          args:[
            {
              index:0,
              label:"one",
              htmlURL:"/app_modules/tabs/tab-one/tab-one.html",
              modelURL:"/app_modules/tabs/tab-one/tab-one.js",
              elSelector:"#module-tab-one"
            },
            {
              index:1,
              label:"two",
              htmlURL:"/app_modules/tabs/tab-two/tab-two.html",
              modelURL:"/app_modules/tabs/tab-two/tab-two.js",
              elSelector:"#module-tab-two"
            },
            {
              index:2,
              label:"three",
              htmlURL:"/app_modules/tabs/tab-three/tab-three.html",
              modelURL:"/app_modules/tabs/tab-three/tab-three.js",
              elSelector:"#module-tab-three"
            }
          ]
        },
        elSelector: '#module-tabs'
      });

      return loader.request_render([header, footer, menu, module]);

});
