define([
  "loader"
], function(loader) {

      console.log("Executing Test Loader...");

      loader.create_observable("msg").subscribe(function(value){
        alert(value); //see test.js
      });

      var modulePromise = loader.load_module("test", {
        arg1:"Hello",
        arg2:"World!!!"
      });

      //lazy loading module
      modulePromise.then(function(testModule){
        console.log("lazy loading module:", "/app_modules/planet.js");
        System.import("/app_modules/planet.js").then(function(planetModule) {
          console.log("planet module resolved")
          var planet = planetModule.default;
          var viewmodel = testModule.viewmodel;
          viewmodel.planet(planet.name); //observer
        });
        return testModule;
      });

      return modulePromise;

});
