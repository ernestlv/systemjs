define([
  "loader"
], function(loader) {
      console.log("Executing Table Loader...");

      return loader.load_module("table", null, "/app1_modules/");

});
