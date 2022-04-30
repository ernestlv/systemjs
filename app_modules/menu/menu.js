define([
  "jquery",
  "loader"
], function($, loader) {

  console.log("Executing Menu Module...");

  return function MenuModel(content) {
    loader.request_render_submodule(null, content.url, content.selector); //request module to inject in #app-content
    this.expand = function() {
      console.log("collapse app menu...");
      if ($("#app-menu").hasClass("collapse")) {
        $("#app-menu").removeClass("collapse");
        return;
      }
      $("#app-menu").addClass("collapse");
    }
  };

});
