define([
  "jquery",
  "loader"
], function($, loader) {

  console.log("Executing Navigator Module...");

  loader.when_element_ready("app-content", function(element) {
    console.log("Page content rendered:", element.id);
    $(document.body).addClass("modules-rendered");
  });

  return function NavigatorModel() {
    this.app_module = loader.get_observable("app_module");
    var remove_module = loader.get_observable("remove_module");
    var current_module = this.app_module();

    this.app_module.subscribe(function(moduleID) { //every time app_module is updated
      remove_module(current_module);
      var el = document.querySelector("#app-content");
      $(el).empty();
      current_module = moduleID;
    });
  };
});
