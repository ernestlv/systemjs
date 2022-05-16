define([
  "loader"
], function(loader) {

      console.log("Executing Tabs Loader...");

      var tabModules = [ "table", "form", "list" ]; //see tabs/viewmodule.js

      return loader.load_module("tabs", tabModules);

});
