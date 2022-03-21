define([
  "../include-module.js",
  "./menu-model.js"
], function(include, menuModel) {

      console.log("Menu Module created!");

      include({
        htmlURL: '/fragments/menu/menu.html',
        cssURL: '/fragments/menu/menu.css',
        koModel: menuModel,
        elSelector: '#fragment-menu'
      });

});
