define([
  "app",
  "/app_modules/table/table-loader.js"
], function(app, table){
  console.log("Executing Tab One Module...");

  app.request_render(table, "#tab-one-body");

});
