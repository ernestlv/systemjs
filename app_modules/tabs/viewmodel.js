define([
  "knockout",
  "loader"
], function(KO, loader){

  console.log("Executing Tabs Module...");

  var loadedTabs = [];

  KO.bindingHandlers.request_tab =  {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      return { controlsDescendantBindings: true};
    },

    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var currentTab = viewModel.currentTab();
      var tab = valueAccessor();
      if (currentTab !== tab) {
        return; //abort binding wrong tab
      }
      var index = loadedTabs.indexOf(tab);
      if (index !== -1) {
        return; //abort binding tab already loaded
      }
      var module = viewModel.tabModules[tab];
      var promiseModule = loader.request_module2(module);
      loader.request_render_child(promiseModule, element, bindingContext).then(function(module){
        loadedTabs.push(tab);
        console.log("Tab was rendered", tab);
      });
    }
  }

  var changeTab = loader.create_observable("changeTab");

  function click(){
   alert("page click!");
  }


  var changeTab = loader.get_observable("changeTab");

  changeTab.subscribe(function(index) {
    console.log("changeTab:", index);
    if (index !== 2){
      $(document.body).off('click', click);
    } else {
      $(document.body).on('click', click);
    }
  });

  return function TabsModel(tabModules) {
    var self = this;
    self.tabModules = tabModules; //see tabs/loader.js
    self.currentTab = KO.observable(-1);
    self.selectTab = function(index) {
      var currentTab = self.currentTab();
      if (currentTab === index) {
        return; //tab already selected
      }
      changeTab(index);
      self.currentTab(index);
    };
    self.selectTab(0); //first tab default
  };
});
