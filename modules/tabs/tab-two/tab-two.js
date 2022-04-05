define(["loader"], function(loader){
  console.log("Tab Two Module loaded");

  loader.load_page([
    "/modules/list/list-loader.js"
  ]);
});
