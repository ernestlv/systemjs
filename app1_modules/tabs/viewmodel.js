define([
  "knockout",
  "loader"
], function(KO, loader){
  console.log("Executing Tabs Module...");

  var loadedTabs = [];
  var currentTab = loader.create_observable("currentTab", "");

  function click(){
   alert("page click!");
  }

  function toggleClick(currentTabName) {
    console.log("currentTab:", currentTabName);
    if (currentTabName !== 'list'){
      $(document.body).off('click', click);
    } else {
      $(document.body).on('click', click);
    }
  }

  loader.when_app_module_updated("tabs", function(){
    var currentTabName = currentTab();
    toggleClick(currentTabName);
  });

  loader.when_module_removed("tabs", function(){
    loadedTabs = [];
    $(document.body).off('click', click);
  });

  currentTab.subscribe(toggleClick); //every time currentTab is updated

  KO.bindingHandlers.request_tab =  {
    init: function(element, valueAccessor, allBindings, viewmodel, bindingContext) {
      return { controlsDescendantBindings: true};
    },

    update: function(element, valueAccessor, allBindings, viewmodel, bindingContext) {
      var selectedTabName = currentTab();
      var tabName = valueAccessor();
      if (selectedTabName !== tabName) {
        return; //abort wrong tab
      }
      var index = loadedTabs.indexOf(selectedTabName);
      if (index !== -1) {
        return; //abort tab already loaded
      }
      var root_folder = loader.get_observable("root_folder");
      var moduleURL = root_folder() + selectedTabName + "/loader.js";
      loader.update_module(moduleURL, element, allBindings, bindingContext).then(function(module){
        loadedTabs.push(selectedTabName);
        console.log("Tab was rendered", selectedTabName);
      });
    }
  }

  return function TabsModel(tabModules) {
    var self = this;
    self.tabModules = tabModules; //see tabs/loader.js
    self.currentTab = currentTab;
    self.selectTab = function(selectedTabName) {
      var currentTabName = currentTab();
      if (currentTabName === selectedTabName) {
        return; //tab already selected
      }
      currentTab(selectedTabName);
    };
    self.selectTab(tabModules[0]); //first tab default
  };
});
