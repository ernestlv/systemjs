define([
  "jquery",
  "knockout"
], function($, KO) {

      console.log("1 Executing Module Loader ...");

      var observables = {};

      //ajax request html fragment and injects it in element def by selector
      return {
        request_module:function(dependencies) {
          var htmlPromise, cssPromise, viewModelPromise, argsPromise
          var {id, htmlURL, cssURL, viewModelURL, viewModel} = dependencies;

          console.log("3 Requesting Module:", id, htmlURL, cssURL, viewModelURL, viewModel);

          if (htmlURL) {
            htmlPromise = $.ajax({
              url:htmlURL,
              dataType:'html'
            });
          } else {
            htmlPromise = Promise.resolve(undefined);
          }

          if (cssURL) {
            cssPromise = $.ajax({
              url:cssURL,
              dataType:'text'
            });
          } else {
            cssPromise = Promise.resolve(undefined);
          }

          if (viewModel || viewModelURL) {
            if (typeof viewModelURL === "string") {
              viewModelPromise = System.import(viewModelURL).then(function(module){
                console.log("8 request_module: viewModelURL resolved for:", viewModelURL);
                return module.default;
              });
              argsPromise = Promise.resolve(undefined);
            } else {
              viewModelPromise = System.import(viewModel.url).then(function(module){
                console.log("8 request_module: viewModel resolved for:", viewModel);
                return module.default;
              });
              argsPromise = Promise.resolve(viewModel.args);
            }
          } else {
            viewModelPromise = Promise.resolve(undefined);
            argsPromise = Promise.resolve(undefined);
          }

          return Promise.all([htmlPromise, cssPromise, viewModelPromise, argsPromise]).then(function([html, css, ViewModel, args]){
            console.log("9 request_module: html, css, model dependencies resolved for module:", id);
            var viewModel;
            if (ViewModel) {
              console.log("9.1 Creating viewModel:", id, ViewModel);
              if (typeof ViewModel === "function") { //true if model module returns a function
                viewModel = new ViewModel(args);
              } else {
                viewModel = ViewModel;
              }
            }
            return { id, html, css, viewModel };
          });
        },

        request_render: function(promiseModule, selector) { //modules to render
          console.log("5 request_render: For ", selector);
          return promiseModule.then(function(module){ //returns array of promises resolved to all rendered modules
            console.log("10 Rendering Module:", module.id);
            var el = document.querySelector(selector);
            var { html, css, viewModel } =  module;
            el && css && $(el).append('<style type="text/css">' + css + '</style>');
            el && html && $(el).append(html);
            try {
              el && viewModel && KO.applyBindings(viewModel, el);
            } catch(e) {
              console.error(e, "element:", el, "viewModel:", viewModel);
            }
            return module;
          });
        },

        ready(promiseModules, callback) {
          Promise.all(promiseModules).then(callback);
        },

        has_observable: function(id) {
          return !!observables[id];
        },

        create_observable: function(id, value) {
          if (!this.has_observable(id)) {
            observables[id] = KO.observable(value);
          }
          return observables[id];
        },

        get_observable: function(id) {
          return observables[id];
        }
      };
});
