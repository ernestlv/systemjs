define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/list-model.js"
], function($, KO, ListModel) {

      console.log("List Module created!");
      KO.applyBindings(new ListModel(), document.querySelector(".KO-module-list"));
});
