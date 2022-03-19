define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/form-model.js"
  ], function($, KO, FormModel) {

      console.log("Form Module created!");
      
      KO.applyBindings(new FormModel(), document.querySelector(".KO-module-form"));
});
