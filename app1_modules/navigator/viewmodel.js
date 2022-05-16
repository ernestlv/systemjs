define([
  "jquery",
  "knockout",
  "loader"
], function($, KO, loader) {

  console.log("Executing Navigator Module...");

  return function NavigatorModel() {
    this.expand = function() {
      if ($("#module-navigator").hasClass("x-collapse")) {
        console.log("expand app navigator...");
        $("#module-navigator").removeClass("x-collapse");
        return;
      }
      console.log("collapse app navigator...");
      $("#module-navigator").addClass("x-collapse");
    }

    this.openModule = function(pageModule) {
      var app_module = loader.get_observable("app_module"); //see /app/navigator/template.html
      app_module(pageModule.toLowerCase()); //update module
    }
  };

});
