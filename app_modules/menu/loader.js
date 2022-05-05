define([
  "loader"
], function(loader) {

      console.log("Executing Menu Loader...");

      var modulePromise = loader.request_module2("menu");

      return modulePromise;
});
