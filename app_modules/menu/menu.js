define([
  "jquery"
], function($) {

  console.log("Executing Menu Module...");

  return {
    expand: function() {
      console.log("collapse app menu...");
      if ($("#module-menu").hasClass("collapse")) {
        $("#module-menu").removeClass("collapse");
        return;
      }
      $("#module-menu").addClass("collapse");
    }
  };

});
