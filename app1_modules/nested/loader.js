define([
  "loader"
], function(loader) {

      console.log("Executing Nested Loader...");

      return loader.load_module("nested");

});
