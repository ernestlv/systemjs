define([
  "knockout",
  "app"
], function(KO, app){

  console.log("Executing Tabs Module...");

  var loadedTabs = [];

  function requestTab(index, selectedTab, selector) {
    for (var i=0; i<loadedTabs.length; i++) {
      if (loadedTabs[i] === index) {
        return Promise.resolve(index); //tab already loaded
      }
    }
    var tabPromise = app.request_module(selectedTab);
    return app.request_render(tabPromise, selector).then(function(renderedTabModule){
      console.log("tab module rendered:", renderedTabModule);
      loadedTabs.push(index);
      return index;
    });
  }

  return function TabsModel(tabs) {
    var self = this;
    self.tabs = tabs;
    self.currentTab = KO.observable(-1);
    self.selectTab = function(index, selector, evt) {
      var currentTab = self.currentTab();
      if (currentTab === index) {
        return; //tab already selected
      }
      var selectedTab = self.tabs[index];
      requestTab(index, selectedTab, selector).then(function(index){
        self.currentTab(index);
      });
    };
    self.selectTab(0, '#tab-one-content'); //first tab default
  };
});
