# systemjs
systemjs modular app

package.json
{
  "name": "systemjs",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "lite-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lite-server": "^2.6.1",
    "systemjs": "^6.12.1",
    "typescript": "^4.5.5"
  }
}
============================
index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SystemJS-knockout-App</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="text/javascript" src="/node_modules/systemjs/dist/system.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/named-register.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/amd.js"></script>
  <!-- <script type="text/javascript" src="node_modules/typescript/lib/typescript.js"></script> -->
  <script type="systemjs-importmap">
    {
      "imports":{
      }
    }
  </script>
</head>
<body>
  <div class="module-main">
    <h2>Menu</h2>
    <ul>
      <li><a href="/pages/form.html">Form</a></li>
      <li><a href="/pages/list.html">List</a></li>
      <li><a href="/pages/table.html">Table</a></li>
      <li><a href="/pages/nested.html">Nested</a></li>
      <li><a href="/pages/custom.html">Custom</a></li>
      <li><a href="/pages/links.html">Links</a></li>
    </ul>
  </div>
  <script>
    System.import('./main.js');
  </script>
</body>
</html>
=========================================
main.js
define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "./modules/person.js",
  "./modules/car.js",
  ], function($, KO, Person, car) {
      var person = new Person();

      console.log("Dynamic module loading ...");
      System.import("./modules/planet.js").then(function(module) {
        var planet = module.default;
        console.log("Hello from ", planet.name);
      });

});
==========================================
styles.css
table, td {
  border: 1px solid black;
}
==========================================
car.js
define({
    model: "vw"
});
==========================================
person.js
define(function(){
  console.log("Person Loaded!");

  class Person {
    name = "Pai"
  }

  return Person;
});
=======================================
planet.js
define(function(){
  console.log("planet loaded!");
  return {
    name: "Earth!"
  };
});
=======================================
links.js
define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js"
  ], function($) {

      var hostName = window.location.hostname;
      $('a[href^="http://"]:not([href*="://'+hostName+'"])').css('pointer-events','none');
      $('*:has(> a[href^="http://"]:not([href*="://'+hostName+'"]))').css('cursor','pointer');
      $(document.body).on('click', '*:has(> a[href^="http://"]:not([href*="://'+hostName+'"]))', function(event) {
        alert($(this).children().attr('href'))
      });

});
=========================================
custom-model.js
define(["https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"], function(KO) {
  console.log("Custom Model loaded!!");
  return function TextModel() {
    this.pageTitle = "Test KO";
    this.firstName = KO.observable("John");
    this.lastName = KO.observable("Smith");
    this.fullName = KO.computed(function() {
      return this.firstName() + " " + this.lastName();
    }, this);
  };
});
=====================================
form-model.js
define(["https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"], function(KO){
  console.log("Form Model loaded!!");
  return function FormModel() {
    this.pageTitle = "Test KO";
    this.firstName = KO.observable("John");
    this.lastName = KO.observable("Smith");
    this.fullName = KO.computed(function(){
      return this.firstName() + " " + this.lastName();
    }, this);
    this.capitalizeLastName = function(){
      var currentVal = this.lastName();
      this.lastName(currentVal.toUpperCase());
    }
  };
});
======================================
list-model.js
define(["https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"], function(KO){
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
=======================================
nested-model.js
define([
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"
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
=======================================
table-model.js
define(["https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"], function(KO){
  console.log("Table Model loaded!!");
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
======================================
costume-module.js
define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/custom-model.js"
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
=====================================
custome.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Form</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="text/javascript" src="/node_modules/systemjs/dist/system.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/named-register.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/amd.js"></script>
  <!-- <script type="text/javascript" src="node_modules/typescript/lib/typescript.js"></script> -->
  <script type="systemjs-importmap">
    {
      "imports":{
      }
    }
  </script>
</head>
<body>
  <div class="KO-module-custom">
    <h2 data-bind="upperX: pageTitle"></h2>
    <span data-bind="upperX: firstName"></span>
    <span data-bind="upperX: lastName"></span><br>
    <span data-bind="upperX: fullName"></span>
  </div>
  <a href="/">Back</a>
  <script>
    System.import('./custom-module.js');
  </script>
</body>
</html>
======================================
form-module.js
define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/form-model.js"
  ], function($, KO, FormModel) {

      console.log("Form Module created!");
      KO.applyBindings(new FormModel(), document.querySelector(".KO-module-form"));
});
======================================
form.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Form</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="text/javascript" src="/node_modules/systemjs/dist/system.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/named-register.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/amd.js"></script>
  <!-- <script type="text/javascript" src="node_modules/typescript/lib/typescript.js"></script> -->
  <script type="systemjs-importmap">
    {
      "imports":{
      }
    }
  </script>
</head>
<body>
  <div class="KO-module-form">
    <h2>Form</h2>
    <input data-bind="value: firstName" />
    <input data-bind="value: lastName" />
    <br>
    <h2 data-bind="text: pageTitle"></h2>
    <span data-bind="text: firstName"></span>
    <span data-bind="text: lastName"></span><br>
    <span data-bind="text: fullName"></span><br>
    <button data-bind="click: capitalizeLastName">CLastName</button>
  </div>
  <a href="/">Back</a>
  <script>
    System.import('./form-module.js');
  </script>
</body>
</html>
==========================================
links-module.js
define([
  "../modules/links.js"
], function($, KO, TextModel) {

      console.log("Links Module created!");

});
============================================
links.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Form</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="text/javascript" src="/node_modules/systemjs/dist/system.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/named-register.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/amd.js"></script>
  <!-- <script type="text/javascript" src="node_modules/typescript/lib/typescript.js"></script> -->
  <script type="systemjs-importmap">
    {
      "imports":{
      }
    }
  </script>
</head>
<body>
  <div class="module-custom">
    <h2>Links</h2>
    <div id="outterDiv">
      <form id="myForm">
        <div id="innerDiv">
          <div>
            <div id="innerInnerDiv">
              <a href="http://ernestlv.github.io">link X</a>
            </div>
          </div>
          <div>
            <a href="https://www.google.com">link 2</a>
          </div>
        </div>
      </form>
    </div>
  </div>
  <a href="/">Back</a>
  <script>
    System.import('./links-module.js');
  </script>
</body>
</html>
==============================================
list-module.js
define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/list-model.js"
], function($, KO, ListModel) {

      console.log("List Module created!");
      KO.applyBindings(new ListModel(), document.querySelector(".KO-module-list"));
});
==============================================
list.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SystemJS-knockout-App</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="text/javascript" src="/node_modules/systemjs/dist/system.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/named-register.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/amd.js"></script>
  <!-- <script type="text/javascript" src="node_modules/typescript/lib/typescript.js"></script> -->
  <script type="systemjs-importmap">
    {
      "imports":{
      }
    }
  </script>
</head>
<body>
  <div class="KO-module-list">
    <h2>List</h2>
    <ul data-bind="foreach: items">
      <li data-bind="text: $data"></li>
    </ul>
    <button data-bind="click: addItem">Add item</button>
  </div>
  <a href="/">Back</a>
  <script>
    System.import('./list-module.js');
  </script>
</body>
</html>
=====================================
nested-module.js
define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/nested-model.js"
], function($, KO, NestedModel) {

      console.log("Nested Module created!");
      KO.applyBindings(new NestedModel(), document.querySelector(".KO-module-nested"));
});
====================================
nested.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SystemJS-knockout-App</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="text/javascript" src="/node_modules/systemjs/dist/system.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/named-register.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/amd.js"></script>
  <!-- <script type="text/javascript" src="node_modules/typescript/lib/typescript.js"></script> -->
  <script type="systemjs-importmap">
    {
      "imports":{
      }
    }
  </script>
</head>
<body>
  <div class="KO-module-nested">
    <h2>Table Nested Array</h2>
    <table>
      <tbody data-bind="foreach: rows">
        <tr>
          <!-- ko foreach: { data: $data, as:'col'} -->
          <td data-bind="text: col"></td>
          <!-- /ko -->
        </tr>
      </tbody>
    </table>
    <button data-bind="click: addRow">Add Row</button>
  </div>
  <a href="/">Back</a>
  <script>
    System.import('./nested-module.js');
  </script>
</body>
</html>
==============================================
table-module.js
define([
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
  "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js",
  "../modules/table-model.js"
], function($, KO, TableModel) {

      console.log("Table Module created!");
      KO.applyBindings(new TableModel(), document.querySelector(".KO-module-table"));
});
=======================================
table.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SystemJS-knockout-App</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="text/javascript" src="/node_modules/systemjs/dist/system.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/named-register.js"></script>
  <script type="text/javascript" src="/node_modules/systemjs/dist/extras/amd.js"></script>
  <!-- <script type="text/javascript" src="node_modules/typescript/lib/typescript.js"></script> -->
  <script type="systemjs-importmap">
    {
      "imports":{
      }
    }
  </script>
</head>
<body>
  <div class="KO-module-table">
    <h2>Table</h2>
    <table>
      <tbody data-bind="foreach: rows">
        <tr>
          <td data-bind="text: name"></td>
          <td data-bind="text: phone"></td>
        </tr>
      </tbody>
    </table>
    <button data-bind="click: addRow">Add Row</button>
  </div>
  <a href="/">Back</a>
  <script>
    System.import('./table-module.js');
  </script>
</body>
</html>

