define([
  "jquery",
  "loader"
], function($, loader) {

  console.log("Executing SPA Module...");

  loader.when_element_ready("app-content", function(element) {
    console.log("SPA content rendered:", element.id);
    $(document.body).addClass("modules-rendered"); //display whole app after everything is loaded and rendered
  });

  return function SPAModel() {
    var current_module = "test";
    this.args = {
      arg1:"Hello",
      arg2:"World!!!"
    };
    var remove_module = loader.get_observable("remove_module");

    this.app_module = loader.get_observable("app_module");
    this.app_module(current_module); //modules are cached
    this.app_module.subscribe(function(moduleID) { //every time app_module is updated - see navigator/template.html
      console.log("remove module:", current_module);
      remove_module(current_module); //notify module will be removed
      var el = document.querySelector("#app-content");
      $(el).empty();
      current_module = moduleID;
    });
  };
});
