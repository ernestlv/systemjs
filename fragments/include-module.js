define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"
], function($, KO) {

      console.log("Include Module created!");

      //ajax request html fragment and injects it in element def by selector
      return function({htmlURL, cssURL, koModel, elSelector}) {
        var html, css;

        if (htmlURL) {
          html = $.ajax({
            url:htmlURL,
            dataType:'html'
          });
        } else {
          html = Promise.resolve(undefined);
        }

        if (cssURL) {
          css = $.ajax({
            url:cssURL,
            dataType:'text'
          });
        } else {
          css = Promise.resolve(undefined);
        }

        Promise.all([html, css]).then(function([html, css]){
          var el = document.querySelector(elSelector);
          css && el && $(el).append('<style type="text/css">' + css + '</style>');
          html && el && $(el).append(html);
          koModel && el && KO.applyBindings(new koModel(), el);
        });
      };

});
