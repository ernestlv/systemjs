define([
  "knockout",
  "custom-knockout-bindings"
], function(KO) {

  console.log("Custom Model loaded!!");

  return function CustomModel() {
    this.pageTitle = "Custom";
    this.firstName = KO.observable("John");
    this.lastName = KO.observable("Smith");
    this.fullName = KO.computed(function() {
      return this.firstName() + " " + this.lastName();
    }, this);
  };
});
