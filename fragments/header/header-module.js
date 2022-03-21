define([
  "../include-module.js",
  "./header-model.js"
], function(include, HeaderModel) {

      console.log("Header Module created!");

      include({
        htmlURL: '/fragments/header/header.html',
        cssURL: '/fragments/header/header.css',
        koModel: HeaderModel,
        elSelector: '#fragment-header'
      });

});
