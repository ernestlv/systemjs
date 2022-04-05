define([
  "knockout"
], function(KO){
  console.log("Executing Table Module...");

  return function TabletModel() {
    this.rows = KO.observableArray([
      { name: "John", phone: "123-456-7890"},
      { name: "Mary", phone: "123-456-7891"},
      { name: "Pablo", phone: "123-456-7892"}
    ]);
    this.addRow = function() {
      this.rows.push({ name: "Ernest", phone: "123-456-7893"});
    };
  };
});
