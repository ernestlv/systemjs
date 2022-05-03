define([
  "jquery",
  "knockout",
  "bootstrap",
  "loader"
], function($, KO, loader){

  console.log("Executing Tabs Module...");

  var changeTab = KO.observable("changeTab");

  changeTab.subscribe(function(value) {
    console.log("changeTab:", value);
  });

  return function Tabs2Model(tabs) {
    var self = this;
    self.tabs = tabs;
    self.currentTab = KO.observable(-1);
    self.selectTab = function(index) {
      var currentTab = self.currentTab();
      if (currentTab === index) {
        return; //tab already selected
      }
      changeTab({currentTab, index});
      self.currentTab(index);
    };
    self.selectTab(0); //first tab default
  };
});
