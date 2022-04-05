define([
  "jquery",
  "loader",
  "/modules/header/header-loader.js",
  "/modules/footer/footer-loader.js",
  "/modules/menu/menu-loader.js"
], function($, loader, header, footer, menu) {

      console.log("Exectuing Links Module...");

      var hostName = window.location.hostname;
      $('a[href^="http://"]:not([href*="://'+hostName+'"])').css('pointer-events','none');
      $('*:has(> a[href^="http://"]:not([href*="://'+hostName+'"]))').css('cursor','pointer');
      $(document.body).on('click', '*:has(> a[href^="http://"]:not([href*="://'+hostName+'"]))', function(event) {
        alert($(this).children().attr('href'))
      });

      return Promise.all([header,footer, menu]);

});
