define([
  "loader"
], function(loader) {

      console.log("2 Executing Index Loader...");

      var module = loader.request_module({
        htmlURL: '/app_modules/index/index.html',
        cssURL: '/app_modules/index/index.css',
        modelURL: {
          url: '/app_modules/index/index.js',
          args: {
            arg1:"Hello",
            arg2:"World!!!"
          }
        },
        elSelector: '.module-content'
      });

      module.then(function(indexModule){
        console.log("9.2 request_module resolved");
        System.import("/app_modules/planet.js").then(function(planetModule) {
          console.log("13 planet module resolver")
          var planet = planetModule.default;
          var viewModel = indexModule.koModel;
          viewModel.planet(planet.name);
        });
        return indexModule;
      });

      return loader.request_render([module]);
});
