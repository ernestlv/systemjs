define([
  "loader"
], function(loader) {

      console.log("Tabs Loader created!");

      return loader.load_module({
        htmlURL: '/modules/tabs/tabs.html',
        cssURL: '/modules/tabs/tabs.css',
        modelURL: '/modules/tabs/tabs.js',
        elSelector: '#module-tabs'
      });

});
