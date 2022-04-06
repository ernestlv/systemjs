define([
  "jquery",
  "knockout"
], function($, KO) {

      console.log("1 Executing Module Loader ...");

      var observables = {};

      //ajax request html fragment and injects it in element def by selector
      return {
        request_module:function({id, htmlURL, cssURL, modelURL, elSelector}) {
          var htmlPromise, cssPromise, modelPromise, argsPromise
          console.log("3 Requesting Module:", {id, htmlURL, cssURL, modelURL, elSelector});

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

          if (modelURL) {
            if (typeof modelURL === "string") {
              modelPromise = System.import(modelURL).then(function(module){
                console.log("8 request_module: module for modelURL resolved:", modelURL);
                return module.default;
              });
              argsPromise = Promise.resolve(undefined);
            } else {
              modelPromise = System.import(modelURL.url).then(function(module){
                console.log("8 request_module: module for modelURL resolved:", modelURL);
                return module.default;
              });
              argsPromise = Promise.resolve(modelURL.args);
            }
          } else {
            modelPromise = Promise.resolve(undefined);
            argsPromise = Promise.resolve(undefined);
          }

          return Promise.all([htmlPromise, cssPromise, modelPromise, argsPromise]).then(function([html, css, model, args]){
            console.log("9 request_module: html, css, model dependencies resolved for module:", id);
            var viewModel;
            if (model) {
              console.log("9.1 Creating view-model:", id, model);
              if (typeof model === "function") { //true if model module returns a function
                viewModel = new model(args);
              } else {
                viewModel = model;
              }
            }
            var el = document.querySelector(elSelector);
            return { id, elSelector, el, html, css, viewModel };
          });
        },

        request_render: function(promiseModules) { //modules to render
          console.log("5 request_render: For Requested Modules:", promiseModules);
          return Promise.all(promiseModules).then(function(modules){ //returns array of promises resolved to all rendered modules
            return modules.map(function(module){ //render module
              if (Object.prototype.toString.apply(module) === '[object Array]') { //if this is true request_render was called twice for the same module in different loaders.
                console.log("10 Recursive Rendering for Module:", module[0].id);
                return module[0];
              }
              var { id, elSelector, el, html, css, viewModel } =  module;
              console.log("10 Rendering Module:", id);
              el && css && $(el).append('<style type="text/css">' + css + '</style>');
              el && html && $(el).append(html);
              el && viewModel && KO.applyBindings(viewModel, el);
              return module;
            });
          });
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
