define([
  "app"
], function(app){
  console.log("Executing Tab Three Module...");

  System.import('/app_modules/links.js').then(function(module){
    console.log('tab content loaded');
  });

});
