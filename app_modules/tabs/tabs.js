define([
  "knockout",
  "app"
], function(KO, app){

  console.log("Executing Tabs Module...");

  var loadedTabs = [];

  KO.bindingHandlers.request_tab_module =  {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      return { controlsDescendantBindings: true};
    },

    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var currentTab = viewModel.currentTab();
      var value = valueAccessor();
      if (currentTab !== value) {
        return; //abort binding wrong tab
      }
      var index = loadedTabs.indexOf(value);
      if (index !== -1) {
        return; //abort binding tab already loaded
      }
      var module = viewModel.tabs[value];
      var promiseModule = app.request_module(module);
      app.request_render_child(promiseModule, element, bindingContext).then(function(module){
        loadedTabs.push(value);
        console.log("Tab was rendered", value);
      });
    }
  }

  var changeTab = app.create_observable("changeTab");

  function click(){
   alert("page click!");
  }


  var changeTab = app.get_observable("changeTab");

  changeTab.subscribe(function(value) {
    console.log("changeTab:", value);
    if (value.index !== 2){
      $(document.body).off('click', click);
    }
    if (value.index === 2){
      $(document.body).on('click', click);
    }
  });

  return function TabsModel(tabs) {
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
