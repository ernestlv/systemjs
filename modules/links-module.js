define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js"
], function($) {

      console.log("Links Module created!");

      var hostName = window.location.hostname;
      $('a[href^="http://"]:not([href*="://'+hostName+'"])').css('pointer-events','none');
      $('*:has(> a[href^="http://"]:not([href*="://'+hostName+'"]))').css('cursor','pointer');
      $(document.body).on('click', '*:has(> a[href^="http://"]:not([href*="://'+hostName+'"]))', function(event) {
        alert($(this).children().attr('href'))
      });

});
