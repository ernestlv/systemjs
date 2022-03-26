define([
  "jquery",
  "knockout"
], function($, KO) {

      console.log("Loader Module created!");

      //ajax request html fragment and injects it in element def by selector
      return {
        load_module:function({htmlURL, cssURL, modelURL, elSelector}) {
          var htmlPromise, cssPromise, modelPromise, argsPromise;

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
              modelPromise = System.import(modelURL);
              argsPromise = Promise.resolve(undefined);
            } else {
              modelPromise = System.import(modelURL.url);
              argsPromise = Promise.resolve(modelURL.args);
            }
          } else {
            modelPromise = Promise.resolve(undefined);
            argsPromise = Promise.resolve(undefined);
          }

          return Promise.all([htmlPromise, cssPromise, modelPromise, argsPromise]).then(function([html, css, model, args]){
            var KO_Model, koModel;
            if (model) {
              KO_Model = model.default;
              if (typeof KO_Model === "function") { //true if model module returns a function
                  console.log("Creating KO view-model...", KO_Model.name);
                  koModel = new KO_Model(args);
              }
            }
            var el = document.querySelector(elSelector);
            el && css && $(el).append('<style type="text/css">' + css + '</style>');
            el && html && $(el).append(html);
            el && koModel && KO.applyBindings(koModel, el);
            return { el, koModel };
          });
        },

        load_page: function(dependencies) {
            var promises = dependencies.map(function(dep) {
              console.log("Loading", dep);
              return System.import(dep);
            });
            return Promise.all(promises).then(function(results){
              console.log("Page Loaded!");
              $(document.body).addClass("page-loaded");
              return results;
            });
        }
      };

});
