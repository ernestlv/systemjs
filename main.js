define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "./modules/person-module.js",
  "./modules/car-module.js"
  ], function($, KO, Person, car) {
      console.log("main module created ...");

      var person = new Person();

      console.log("person", person.name, "car", car.model);

      System.import("./modules/planet-module.js").then(function(module) {
        var planet = module.default;
        console.log("planet", planet.name);
      });

});
