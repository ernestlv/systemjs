define([
  "loader"
], function(loader) {

      console.log("Executing Nested Loader...");

      return loader.request_module2("nested");

});
