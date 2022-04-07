define([
  "app",
  "/app_modules/form/form-loader.js"
], function(app, form){
  console.log("Executing Tab Two Module...");

  app.request_render(form, "#tab-two-body");

});
