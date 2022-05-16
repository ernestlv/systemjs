define([
  "knockout"
], function(KO){

  console.log("Execute Form Module...");

  return function FormModel() {
    this.firstName = KO.observable("John");
    this.lastName = KO.observable("Smith");
    this.fullName = KO.computed(function(){
      return this.firstName() + " " + this.lastName();
    }, this);
    this.capitalizeLastName = function(){
      var currentVal = this.lastName();
      this.lastName(currentVal.toUpperCase());
    }
  };
});
