define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "./title-template.js",
  "./title-styles.js",
  "./title-model.js"
], function($, KO, TitleTemplate, TitleStyles, TitleModel) {

      console.log("Title Module created!");

      var el = document.querySelector("#KO-fragment-title");

      $(el).html(TitleTemplate.header);
      $(el).css(TitleStyles);

      KO.applyBindings(new TitleModel(), el)
});
