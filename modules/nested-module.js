define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/nested-model.js"
], function($, KO, NestedModel) {

      console.log("Nested Module created!");
      KO.applyBindings(new NestedModel(), document.querySelector(".KO-module-nested"));
});
