define([
  "loader",
  "/app_modules/form/form-loader.js"
], function(loader, form){
  console.log("Executing Tab Two Module...");

  loader.request_render(form, "#tab-two-body");

});
