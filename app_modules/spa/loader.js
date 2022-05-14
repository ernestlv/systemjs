define([
  "loader"
], function(loader) {

      console.log("Executing SPA Loader...");

      var modulePromise = loader.load_module("spa");

      return modulePromise;

});
