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
    return loader.load_module(selectedTab).then(function(){
      loadedTabs.push(selectedTab);
      return selectedTab;
    });
  }

  return function ListModel() {
    var self = this;
    self.tabs = [
      {
        label:"one",
        index:0,
        htmlURL:"/modules/tab-one/tab-one.html",
        modelURL:"/modules/tab-one/tab-one.js",
        elSelector:"#module-tab-one"
      },
      {
        label:"two",
        index:1,
        htmlURL:"/modules/tab-two/tab-two.html",
        modelURL:"/modules/tab-two/tab-two.js",
        elSelector:"#module-tab-two"
      },
      {
        label:"three",
        index:2,
        htmlURL:"/modules/tab-three/tab-three.html",
        modelURL:"/modules/tab-three/tab-three.js",
        elSelector:"#module-tab-three"
      }
    ];
    self.currentTab = KO.observable();
    self.selectTab = function(selectedTab) {
      console.log("selectedTab", selectedTab);
      var currentTab = self.currentTab();
      if (currentTab && currentTab.index === selectedTab.index) {
        return; //tab already selected
      }
      loadTab(selectedTab).then(function(selectedTab){
        self.currentTab(selectedTab);
      })
    };
    self.selectTab(self.tabs[0]); //first tab default
  };
});
