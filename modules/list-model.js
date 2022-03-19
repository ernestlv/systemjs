define([
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"
], function(KO){

  console.log("List Model loaded!!");
  
  return function ListModel() {
    this.items = KO.observableArray([
      "item one",
      "item two",
      "item three"
    ]);
    this.addItem = function() {
      this.items.push("item new!");
      console.log(this.items)
    };
  };
});
