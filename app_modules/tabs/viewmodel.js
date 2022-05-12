define([
  "knockout",
  "loader"
], function(KO, loader){
  console.log("Executing Tabs Module...");

  var loadedTabs = [];
  var module_ready = loader.get_observable("module_ready");
  var currentTab = loader.create_observable("currentTab", "");

  function click(){
   alert("page click!");
  }

  function toggleClickEvent(currentTabName) {
    console.log("currentTab:", currentTabName);
    if (currentTabName !== 'list'){
      $(document.body).off('click', click);
    } else {
      $(document.body).on('click', click);
    }
  }

  loader.when_module_inserted("tabs", function(){
    var currentTabName = currentTab();
    toggleClickEvent(currentTabName);
  });

  loader.when_module_removed("tabs", function(){
    loadedTabs = [];
    $(document.body).off('click', click);
  });

  currentTab.subscribe(toggleClickEvent); //when current tabs changes

  KO.bindingHandlers.request_tab =  {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      return { controlsDescendantBindings: true};
    },

    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var selectedTabName = currentTab();
      var tabName = valueAccessor();
      if (selectedTabName !== tabName) {
        return; //abort binding wrong tab
      }
      var index = loadedTabs.indexOf(selectedTabName);
      if (index !== -1) {
        return; //abort tab already loaded
      }
      var moduleURL = "/app_modules/" + selectedTabName + "/loader.js";
      loader.request_render_module(null, moduleURL, element, bindingContext).then(function(module){
        loadedTabs.push(selectedTabName);
        module_ready(element, module);
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
