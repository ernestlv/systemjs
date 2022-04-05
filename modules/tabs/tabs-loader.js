define([
  "loader",
  "/modules/header/header-loader.js",
  "/modules/footer/footer-loader.js",
  "/modules/menu/menu-loader.js"
], function(loader, header, footer, menu) {

      console.log("Tabs Loader created!");

      var module = loader.request_module({
        htmlURL: '/modules/tabs/tabs.html',
        cssURL: '/modules/tabs/tabs.css',
        modelURL: {
          url:'/modules/tabs/tabs.js',
          args:[
            {
              index:0,
              label:"one",
              htmlURL:"/modules/tabs/tab-one/tab-one.html",
              modelURL:"/modules/tabs/tab-one/tab-one.js",
              elSelector:"#module-tab-one"
            },
            {
              index:1,
              label:"two",
              htmlURL:"/modules/tabs/tab-two/tab-two.html",
              modelURL:"/modules/tabs/tab-two/tab-two.js",
              elSelector:"#module-tab-two"
            },
            {
              index:2,
              label:"three",
              htmlURL:"/modules/tabs/tab-three/tab-three.html",
              modelURL:"/modules/tabs/tab-three/tab-three.js",
              elSelector:"#module-tab-three"
            }
          ]
        },
        elSelector: '#module-tabs'
      });

      return loader.request_render([header, footer, menu, module]);

});
