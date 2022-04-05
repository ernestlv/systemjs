define([
  "knockout",
  "loader"
], function(KO, loader){

  console.log("List Model loaded!!");

  var loadedTabs = [];

  function loadTab(selectedTab) {
    for (var i=0; i<loadedTabs.length; i++) {
      if (loadedTabs[i].index === selectedTab.index) {
        return Promise.resolve(selectedTab); //tab already loaded
      }
    }
    console.log("loading tab", selectedTab);
    return loader.request_module(selectedTab).then(function(){
      loadedTabs.push(selectedTab);
      return selectedTab;
    });
  }

  return function TabsModel(tabs) {
    var self = this;
    self.tabs = tabs;
    self.currentTab = KO.observable();
    self.selectTab = function(selectedTab) {
      console.log("selectedTab", selectedTab);
      var currentTab = self.currentTab();
      if (currentTab && currentTab.index === selectedTab.index) {
        return; //tab already selected
      }
      loadTab(selectedTab).then(function(selectedTab){
        self.currentTab(selectedTab);
      });
    };
    self.selectTab(self.tabs[0]); //first tab default
  };
});
