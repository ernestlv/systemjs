define([
  "loader",
  "/modules/table/table-loader.js"
], function(loader, table){
  console.log("Execute Tab One Module...");

  loader.request_render([table]);
});
