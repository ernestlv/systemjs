define([
  "jquery",
  "knockout",
  "loader"
], function($, KO, loader) {

  console.log("Executing Portal Menu Module...");

  return function MenuModel() {
    this.expand = function() {
      console.log("collapse app menu...");
      if ($("#module-navigator-menu").hasClass("x-collapse")) {
        $("#module-navigator-menu").removeClass("x-collapse");
        return;
      }
      $("#module-navigator-menu").addClass("x-collapse");
    }

    this.openModule = function(pageModule) {
      var app_module = loader.get_observable("app_module"); //see /app/navigator/template.html
      app_module(pageModule.toLowerCase()); //update module
    }
  };

});
