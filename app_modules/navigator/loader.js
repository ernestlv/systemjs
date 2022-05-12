define([
  "loader"
], function(loader) {

      console.log("Executing Navigator Loader...");

      var modulePromise = loader.request_module2("navigator");

      return modulePromise;

});
