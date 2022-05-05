define([
  "loader"
], function(loader, header, footer, menu) {
      console.log("Executing Main Loader...");

      return loader.request_module2("main");

});
