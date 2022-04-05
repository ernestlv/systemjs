define([], function(){
  console.log("Tab Three Module loaded");

  System.import('/modules/links.js').then(function(module){
    console.log('Page loaded');
    $(document.body).on('click', function(){
      alert("XXX")
    });
  });
});
