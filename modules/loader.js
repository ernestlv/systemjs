define([
  "jquery",
  "knockout"
], function($, KO) {

      console.log("1 Executing Module Loader ...");

      var observables = {};

      //ajax request html fragment and injects it in element def by selector
      return {
        request_module:function({htmlURL, cssURL, modelURL, elSelector}) {
          var htmlPromise, cssPromise, modelPromise, argsPromise
          console.log("3 Requesting Module:", {htmlURL, cssURL, modelURL, elSelector});

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
                console.log("8 request_module: modelURL resolved", modelURL);
                return module.default;
              });
              argsPromise = Promise.resolve(undefined);
            } else {
              modelPromise = System.import(modelURL.url).then(function(module){
                console.log("8 request_module: modelURL resolved", modelURL);
                return module.default;
              });
              argsPromise = Promise.resolve(modelURL.args);
            }
          } else {
            modelPromise = Promise.resolve(undefined);
            argsPromise = Promise.resolve(undefined);
          }

          return Promise.all([htmlPromise, cssPromise, modelPromise, argsPromise]).then(function([html, css, model, args]){
            console.log("9 request_module: html, css, model dependencies resolved");
            var koModel;
            if (model) {
              console.log("9.1 Creating view-model:", elSelector, model);
              if (typeof model === "function") { //true if model module returns a function
                koModel = new model(args);
              } else {
                koModel = model;
              }
            }
            var el = document.querySelector(elSelector);
            return { elSelector, el, html, css, koModel };
          });
        },

        request_render: function(promises) {
          console.log("5 request_render:", promises)
          var new_promises = promises.map(function(promiseModule){
            console.log("5.1 request_render: map module:", promiseModule);
            return promiseModule.then(function({ elSelector, el, html, css, koModel }){
              console.log("10 Rendering Module:", elSelector);
              el && css && $(el).append('<style type="text/css">' + css + '</style>');
              el && html && $(el).append(html);
              el && koModel && KO.applyBindings(koModel, el);
              return { elSelector, el, html, css, koModel };
            });
          });
          return Promise.all(new_promises);
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
