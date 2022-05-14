define([
  "jquery",
  "loader"
], function($, loader) {

  console.log("Executing SPA Module...");

  loader.when_element_ready("app-content", function(element) {
    console.log("SPA content rendered:", element.id);
    $(document.body).addClass("modules-rendered");
  });

  return function SPAModel() {
    var current_module = "test";
    var remove_module = loader.get_observable("remove_module");

    this.app_module = loader.get_observable("app_module");
    this.app_module(current_module);
    this.app_module.subscribe(function(moduleID) { //every time app_module is updated
      console.log("remove module:", current_module);
      remove_module(current_module);
      var el = document.querySelector("#app-content");
      $(el).empty();
      current_module = moduleID;
    });
  };
});
