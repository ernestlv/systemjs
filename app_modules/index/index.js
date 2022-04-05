define([
  "knockout",
  "loader",
  "/app_modules/person.js",
  "/app_modules/car.js"
], function(KO, loader, Person, car) {

  console.log("7 Executing Index Module...");

  var msg = loader.get_observable("msg");

  var person = new Person();

  return function IndexModel(args) {
    this.args = args;
    this.name = KO.observable(person.name);
    this.model = KO.observable(car.model);
    this.planet = KO.observable("");
    this.sendMsg = function() {
      var date = new Date();
      msg(date);
    };
  };
});