define([
  "jquery",
  "loader"
], function($, loader) {

  console.log("Executing Menu Module...");

  return function MenuModel() {
    this.expand = function() {
      console.log("collapse app menu...");
      if ($("#module-menu").hasClass("collapse")) {
        $("#module-menu").removeClass("collapse");
        return;
      }
      $("#module-menu").addClass("collapse");
    }
  };

});
