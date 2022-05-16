define([
  "loader"
], function(loader) {

      console.log("Executing Home Loader...");

      var modulePromise = loader.load_module("home");

      return modulePromise;

});
