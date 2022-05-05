define([
  "loader"
], function(loader) {

      console.log("Executing Tabs Loader...");

      var tabs = [ "table", "form", "list" ]; //tabs modules see tabs/viewmodule.js

      return loader.request_module2("tabs", tabs);

});
