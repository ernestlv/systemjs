define([
  "jquery"
], function($) {

      console.log("Exectuing Links Module...");

      var hostName = window.location.hostname;
      $('a[href^="http://"]:not([href*="://'+hostName+'"])').css('pointer-events','none');
      $('*:has(> a[href^="http://"]:not([href*="://'+hostName+'"]))').css('cursor','pointer');
      $(document.body).on('click', '*:has(> a[href^="http://"]:not([href*="://'+hostName+'"]))', function(event) {
        alert($(this).children().attr('href'))
      });

      $(document.body).on('click', function(){
        alert("page click!")
      });

});
