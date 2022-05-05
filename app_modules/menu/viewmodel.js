define([
  "jquery",
  "loader"
], function($, loader) {

  console.log("Executing Menu Module...");

  return function MenuModel() {
    this.expand = function() {
      console.log("collapse app menu...");
      if ($("#module-menu").hasClass("x-collapse")) {
        $("#module-menu").removeClass("x-collapse");
        return;
      }
      $("#module-menu").addClass("x-collapse");
    }
  };

});
