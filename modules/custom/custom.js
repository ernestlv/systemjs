define([
  "knockout"
], function(KO) {

  console.log("Custom Model loaded!!");

  KO.bindingHandlers.upperX = { //custom binding
    update: function(element, valueAccessor) {
      var value = KO.unwrap(valueAccessor());
      $(element).html(value.toUpperCase());
    }
  }

  return function TextModel() {
    this.pageTitle = "Custom";
    this.firstName = KO.observable("John");
    this.lastName = KO.observable("Smith");
    this.fullName = KO.computed(function() {
      return this.firstName() + " " + this.lastName();
    }, this);
  };
});
