define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "./custom-model.js"
], function($, KO, TextModel) {

      console.log("Custom Module created!");
      KO.bindingHandlers.upperX = { //custom binding
        update: function(element, valueAccessor) {
          var value = KO.unwrap(valueAccessor());
          $(element).html(value.toUpperCase());
        }
      }
      KO.applyBindings(new TextModel(), document.querySelector(".KO-module-custom"));
});
