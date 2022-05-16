define([
  "loader"
], function(loader) {

  console.log("Execute Footer Module...");

  this.app_module = loader.get_observable("app_module");
});
