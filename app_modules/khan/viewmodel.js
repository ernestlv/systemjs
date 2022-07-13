define([
  "jquery"
], function($) {

  console.log("Executing Khan Module...");

  return {
    select: function(url, event) {
      console.log("iframe:", url, event);
      $("#module-khan .khan-menu button.active").removeClass("active");
      $(event.target).addClass("active");
      $("#module-khan iframe").attr("src", url);
    }
  };

});
