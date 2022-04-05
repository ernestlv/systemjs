define([
  "loader"
], function(loader) {

      console.log("2 Executing Index Loader...");

      loader.create_observable("msg").subscribe(function(value){
        alert(value);
      });

      var modulePromise = loader.request_module({
        id:'module-index',
        htmlURL: '/app_modules/index/index.html',
        cssURL: '/app_modules/index/index.css',
        modelURL: {
          url: '/app_modules/index/index.js',
          args: {
            arg1:"Hello",
            arg2:"World!!!"
          }
        },
        elSelector: '#module-content'
      });

      modulePromise.then(function(indexModule){
        console.log("9.2 request_module resolved");
        //lazy loading
        System.import("/app_modules/planet.js").then(function(planetModule) {
          console.log("13 planet module resolver")
          var planet = planetModule.default;
          var viewModel = indexModule.viewModel;
          viewModel.planet(planet.name);
        });
        return indexModule;
      });

      return loader.request_render([modulePromise]);
});