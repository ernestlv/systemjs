define([
  "knockout",
  "../person.js",
  "../car.js"
], function(KO, Person, car) {

  console.log("Test Model loaded!!");

  var person = new Person();

  return function TestModel(args) {
    this.args = args;
    this.name = KO.observable(Person.name);
    this.model = KO.observable(car.model);
    this.planet = KO.observable("");
  };
});
