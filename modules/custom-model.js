define([
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"
], function(KO) {

  console.log("Custom Model loaded!!");
  
  return function TextModel() {
    this.pageTitle = "Test KO";
    this.firstName = KO.observable("John");
    this.lastName = KO.observable("Smith");
    this.fullName = KO.computed(function() {
      return this.firstName() + " " + this.lastName();
    }, this);
  };
});
