define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/table-model.js"
], function($, KO, TableModel) {

      console.log("Table Module created!");
      KO.applyBindings(new TableModel(), document.querySelector(".KO-module-table"));
});
