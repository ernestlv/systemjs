define([
  "jquery",
  "knockout"
], function($, KO) {

      console.log("Executing Module app loader ...");

      var observables = {};

      function create_viewmodel(id, [htmlPromise, cssPromise, viewModelPromise, argsPromise]) {
        return Promise.all([htmlPromise, cssPromise, viewModelPromise, argsPromise]).then(function([html, css, ViewModel, args]){
          console.log("creating viewModel:", id, ViewModel);
          if (ViewModel) {
            if (typeof ViewModel === "function") { //true if model module returns a function
              var viewModel = new ViewModel(args);
            } else {
              var viewModel = ViewModel;
            }
          }
          return { id, html, css, viewModel };
        });
      }

      function request_module(dependencies) {
        var htmlPromise, cssPromise, viewModelPromise, argsPromise
        var {id, htmlURL, cssURL, viewModelURL, viewModel} = dependencies;

        console.log("requesting module:", id, htmlURL, cssURL, viewModelURL, viewModel);

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
              console.log("request_module: viewModelURL resolved for:", viewModelURL);
              return module.default;
            });
            argsPromise = Promise.resolve(undefined);
          } else {
            viewModelPromise = System.import(viewModel.url).then(function(module){
              console.log("request_module: viewModel resolved for:", viewModel);
              return module.default;
            });
            argsPromise = Promise.resolve(viewModel.args);
          }
        } else {
          viewModelPromise = Promise.resolve(undefined);
          argsPromise = Promise.resolve(undefined);
        }
        return create_viewmodel(id, [htmlPromise, cssPromise, viewModelPromise, argsPromise]);
      }

      function request_module2(id, args) {
        return request_module({
          id,
          htmlURL: '/app_modules/'+id+'/template.html',
          cssURL: '/app_modules/'+id+'/styles.css',
          viewModel: {
            url: '/app_modules/'+id+'/viewmodel.js',
            args
          }
        });
      }

      function request_render(promiseModule, selector) { //module to render and element selector
        console.log("request_render: For ", selector);
        return promiseModule.then(function(module){
          console.log("rendering Module:", module.id);
          var el = document.querySelector(selector);
          var { html, css, viewModel } =  module;
          el && css && $(el).append('<style type="text/css">' + css + '</style>');
          el && html && $(el).append(html);
          if (el && viewModel) {
            try {
              KO.applyBindings(viewModel, el);
            } catch(e) {
              console.error(e, "element:", el, "viewModel:", viewModel);
            }
          }
          return module;
        });
      }

      function request_render_child(promiseModule, el, bindingContext) { //module to render in element selector
        if (!el) {
          return Promise.resolve();
        }
        console.log("request_render_child: For ", el);
        return promiseModule.then(function(module){
          console.log("rendering child module:", module.id);
          var { html, css, viewModel } =  module;
          css && $(el).append('<style type="text/css">' + css + '</style>');
          html && $(el).append(html);
          if (viewModel) {
            try {
              var childContext = viewModel;
              if (bindingContext) {
                childContext = bindingContext.createChildContext(viewModel);
                console.log("created new knockout child context:", childContext, "for", viewModel);
              }
               KO.applyBindingsToDescendants(childContext, el);
            } catch(e) {
              console.error(e, "element:", el, "viewModel:", viewModel);
            }
          }
          return module;
        });
      }

      function request_render_module(modulePromise, moduleURL, el, bindingContext) {
        if (!el) {
          return Promise.resolve();
        }
        modulePromise = !modulePromise ? Promise.resolve() : modulePromise;
        return modulePromise.then(function(module){
          console.log("requesting module", moduleURL);
          return System.import(moduleURL).then(function(submodule) { //this import is cached
            console.log("module", moduleURL, "resolved.");
            var submodulePromise = submodule.default;
            return request_render_child(submodulePromise, el, bindingContext).then(function(submodule){
              console.log("module", moduleURL, "rendered.");
              return submodule;
            });
          });
        });
      }

      function ready(promiseModules, callback) {
        Promise.all(promiseModules).then(callback);
      }

      function has_observable(id) {
        return !!observables[id];
      }

      function create_observable(id, value) {
        if (!has_observable(id)) {
          observables[id] = KO.observable(value);
        }
        return observables[id];
      }

      function get_observable(id) {
        return observables[id];
      }

      var app_module = create_observable("app_module");
      var module_ready = create_observable("module_ready");
      var remove_module = create_observable("remove_module");

      KO.bindingHandlers.request_module = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
          return { controlsDescendantBindings: true};
        },

        update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
          //see https://stackoverflow.com/questions/19422801/knockoutjs-bindinghandler-with-childbindingcontext-data-parent
          var moduleURL = KO.unwrap(valueAccessor()); //submodule content
          request_render_module(null, moduleURL, element, bindingContext).then(function(submodule){
            module_ready(element);
          });
        }
      };

      KO.bindingHandlers.include_module = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
          return { controlsDescendantBindings: true};
        },

        update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
          //see https://stackoverflow.com/questions/19422801/knockoutjs-bindinghandler-with-childbindingcontext-data-parent
          var moduleURL = KO.unwrap(valueAccessor()); //submodule content
          moduleURL = "/app_modules/" + moduleURL + "/loader.js";
          request_render_module(null, moduleURL, element, bindingContext).then(function(module){
            module_ready(element, module);
          });
        }
      };

      function when_element_ready(id, cb) {
        return module_ready.subscribe(function(el, module) {
          if (id === el.id) {
            cb(el, module);
          }
        });
      }

      function when_module_removed(id, cb) {
        return remove_module.subscribe(function(moduleID) {
          if (id === moduleID) {
            cb();
          }
        });
      }

      function when_module_inserted(id, cb) {
        return app_module.subscribe(function(moduleID) {
          if (id === moduleID) {
            cb();
          }
        });
      }

      //ajax request html fragment and injects it in element def by selector
      return {
        request_module,

        request_module2,

        request_render,

        request_render_child,

        request_render_module,

        ready,

        has_observable,

        create_observable,

        get_observable,

        when_element_ready,

        when_module_removed,

        when_module_inserted
      };
});
