define([
  "knockout"
], function(KO){
  console.log("Nested Model loaded!!");
  
  return function NestedModel() {
    var cols1 = KO.observableArray([
      "John", "123-456-7890"
    ]);
    var cols2 = KO.observableArray([
      "Mary", "123-456-7891"
    ]);
    var cols3 = KO.observableArray([
      "Pablo", "123-456-7892"
    ])
    this.rows = KO.observableArray([
      cols1(), cols2(), cols3()
    ]);
    this.addRow = function() {
      var cols = KO.observableArray([
        "Ernest", "123-456-7893"
      ]);
      this.rows.push(cols());
    };
  };
});
