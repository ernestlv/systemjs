define([
  "jquery"
], function($) {

  console.log("Executing KO Module...");

  return {
    select: function(url, event) {
      console.log("iframe:", url, event);
      $("#module-ko .ko-menu button.active").removeClass("active");
      $(event.target).addClass("active");
      $("#module-ko iframe").attr("src", url);
    }
  };

});
