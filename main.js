define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "./modules/person-module.js",
  "./modules/car-module.js",
  ], function($, KO, Person, car) {
      var person = new Person();

      console.log("main module created ...");
      
      System.import("./modules/planet.js").then(function(module) {
        var planet = module.default;
        console.log("Hello from ", planet.name);
      });

});
