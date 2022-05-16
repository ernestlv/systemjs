define([
  "jquery",
  "knockout",
  "loader",
  "/app2_modules/person.js",
  "/app2_modules/car.js"
], function($, KO, loader, Person, car) {
  console.log("Executing Test Module...");

  var msg = loader.get_observable("msg"); //see test-loader.js

  var person = new Person();

  return function TestModel(args) {
    this.args = args;
    this.name = KO.observable(person.name);
    this.model = KO.observable(car.model);
    this.planet = KO.observable("");
    this.sendMsg = function() {
      var date = new Date();
      msg(date);
    };
    this.openWebApp = function() {
      location = "/pages/main.html";
    }
  };
});
