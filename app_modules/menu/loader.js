define([
  "loader"
], function(loader) {

      console.log("Executing Menu Loader...");

      var modulePromise = loader.load_module("menu", null, "/app_modules/");

      return modulePromise;
});
