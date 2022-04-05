define(["loader"], function(loader){
  console.log("Tab Two Module loaded");

  loader.load_page([
    "/app_modules/list/list-loader.js"
  ]);
});
