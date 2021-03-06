define([
  "jquery",
  "loader"
], function($, loader) {

  console.log("Executing Main Module...");

  loader.when_element_ready("app-menu", function(element) {
    console.log("Main content rendered:", element.id);
    $(document.body).addClass("modules-rendered"); //display whole app after everything is loaded and rendered
  });

  return function MainModel() {
    var remove_module = loader.get_observable("remove_module");
    var default_module = loader.get_observable("default_module");
    var current_module = default_module(); //see loader default_module binding
    this.app_module = loader.get_observable("app_module");
    this.app_module(current_module);
    this.app_module.subscribe(function(moduleID) { //every time app_module is updated - see navigator/template.html
      console.log("remove module:", current_module);
      remove_module(current_module); //notify module will be removed
      var el = document.querySelector("#app-content");
      $(el).empty();
      current_module = moduleID;
    });
  };
});
