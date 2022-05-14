define([
  "loader"
], function(loader, header, footer, menu) {
      console.log("Executing Main Loader...");

      return loader.load_module("main");

});
