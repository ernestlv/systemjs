define([
  "loader"
], function(loader) {

      console.log("Executing Main Loader...");

      var modulePromise = loader.load_module("main", null, "/app_modules/");

      return modulePromise;

});
