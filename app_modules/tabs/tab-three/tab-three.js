define([], function(){
  console.log("Tab Three Module loaded");

  System.import('/app_modules/links.js').then(function(module){
    console.log('tab content loaded');
  });

});
