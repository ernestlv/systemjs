define([
  "loader",
  "/app_modules/table/table-loader.js"
], function(loader, table){
  console.log("Executing Tab One Module...");

  loader.request_render(table, "#tab-one-body");

});
