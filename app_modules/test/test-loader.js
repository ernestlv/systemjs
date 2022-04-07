define([
  "app"
], function(app) {

      console.log("2 Executing Test Loader...");

      app.create_observable("msg").subscribe(function(value){
        alert(value);
      });

      var modulePromise = app.request_module({
        id:'module-index',
        htmlURL: '/app_modules/test/test.html',
        cssURL: '/app_modules/test/test.css',
        viewModel: {
          url: '/app_modules/test/test.js',
          args: {
            arg1:"Hello",
            arg2:"World!!!"
          }
        }
      });

      //module lazy loading
      modulePromise.then(function(testModule){
        console.log("-- Lazy loading module:", "/app_modules/planet.js");
        System.import("/app_modules/planet.js").then(function(planetModule) {
          console.log("13 planet module resolver")
          var planet = planetModule.default;
          var viewModel = testModule.viewModel;
          viewModel.planet(planet.name);
        });
        return testModule;
      });

      return modulePromise;

});
