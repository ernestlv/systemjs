define([
  "jquery",
  "knockout"
], function AppLoader($, KO) {

      console.log("Executing Module app loader ...");

      var observables = {};
      var root_folder = create_observable("root_folder");
      var default_content_module = create_observable("default_content_module");
      var app_module = create_observable("app_module"); //points to current module in #app_content
      var element_ready = create_observable("element_ready"); //fires after #app_content is updated
      var module_ready = create_observable("module_ready"); //fires after #app_content is updated
      var remove_module = create_observable("remove_module"); //fires before #app_content content is removed

      function create_viewmodel(id, htmlPromise, cssPromise, viewmodelPromise, argsPromise) {
        return Promise.all([htmlPromise, cssPromise, viewmodelPromise, argsPromise]).then(function([html, css, ViewModel, args]){
          console.log("creating viewmodel:", id, ViewModel);
          if (ViewModel) {
            if (typeof ViewModel === "function") { //true if model module returns a function
              var viewmodel = new ViewModel(args);
            } else {
              var viewmodel = ViewModel;
            }
          }
          return { id, html, css, viewmodel };
        });
      }

      function request_module(dependencies) {
        var htmlPromise, cssPromise, viewmodelPromise, argsPromise
        var {id, htmlURL, cssURL, viewmodelURL, viewmodel} = dependencies;

        console.log("requesting module " + id + " dependencies:", htmlURL, cssURL, viewmodelURL || viewmodel);

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

        if (viewmodel || viewmodelURL) {
          if (typeof viewmodelURL === "string") {
            viewmodelPromise = System.import(viewmodelURL).then(function(module){
              console.log("viewmodelURL resolved for:", viewmodelURL);
              return module.default;
            });
            argsPromise = Promise.resolve(undefined);
          } else {
            viewmodelPromise = System.import(viewmodel.url).then(function(module){
              console.log("viewmodel resolved for:", viewmodel);
              return module.default;
            });
            argsPromise = Promise.resolve(viewmodel.args);
          }
        } else {
          viewmodelPromise = Promise.resolve(undefined);
          argsPromise = Promise.resolve(undefined);
        }
        return create_viewmodel(id, htmlPromise, cssPromise, viewmodelPromise, argsPromise);
      }

      function load_module(id, args, app_folder) {
        var r_folder = root_folder();
        return request_module({
          id,
          htmlURL: (app_folder || r_folder)+id+'/template.html',
          cssURL: (app_folder || r_folder)+id+'/styles.css',
          viewmodel: {
            url: (app_folder || r_folder)+id+'/viewmodel.js',
            args
          }
        });
      }

      function render_module(promiseModule, selector) { //module to render and element selector
        console.log("render_module:", selector);
        return promiseModule.then(function(module){
          console.log("rendering module:", module.id);
          var el = document.querySelector(selector);
          var { html, css, viewmodel } =  module;
          el && css && $(el).append('<style type="text/css">' + css + '</style>');
          el && html && $(el).append(html);
          if (el && viewmodel) {
            try {
              KO.applyBindings(viewmodel, el); //root context
            } catch(e) {
              console.error(e, "element:", el, "viewmodel:", viewmodel);
            }
          }
          return module;
        });
      }

      function render_child_module(promiseModule, element, bindingContext) { //submodule to render in element using child context
        if (!element) {
          return Promise.resolve();
        }
        console.log("request render child module:", element);
        return promiseModule.then(function(module){
          var { id, html, css, viewmodel } =  module;
          console.log("rendering module:", id);
          css && $(element).append('<style type="text/css">' + css + '</style>');
          html && $(element).append(html);
          if (viewmodel) {
            try {
              var childContext = viewmodel;
              if (bindingContext) {
                childContext = bindingContext.createChildContext(viewmodel);
                console.log("created knockout child context:", childContext, "for", viewmodel);
              }
               KO.applyBindingsToDescendants(childContext, element);
            } catch(e) {
              console.error(e, "element:", element, "viewmodel:", viewmodel);
            }
          }
          return module;
        });
      }

      function request_render_module(parentModulePromise, moduleURL, element, bindingContext) {
        parentModulePromise = !parentModulePromise ? Promise.resolve() : parentModulePromise;
        return parentModulePromise.then(function(module){
          console.log("requesting module:", moduleURL);
          return System.import(moduleURL).then(function(module) { //this import is cached
            console.log("module", moduleURL, "resolved.");
            var modulePromise = module.default;
            return render_child_module(modulePromise, element, bindingContext).then(function(submodule){
              console.log("module", moduleURL, "rendered.");
              return module;
            });
          });
        });
      }

      function update_module(moduleURL, element, allBindings, bindingContext, default_module) { //notify after module is inserted in element
        var temp = default_module || allBindings.get("default_content_module");
        temp && default_content_module(temp);
        return request_render_module(null, moduleURL, element, bindingContext).then(function(module){
          element_ready(element); //notify sends DOM element
          module_ready(module); //notify sends module:{id, html, css, viewmodel}
          return module;
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

      function when_element_ready(id, cb) { //executed after HTML is injected in DOM element
        return element_ready.subscribe(function(element) {
          if (id === element.id) {
            cb(element);
          }
        });
      }

      function when_module_ready(id, cb) { //executed after HTML is injected in DOM
        return module_ready.subscribe(function(module) { //module: {id, html, css, viewmodel}
          if (id === module.id) {
            cb(module);
          }
        });
      }

      function when_app_module_updated(id, cb) { //executes after second time app_module is updated and HTML is injected in DOM
        return app_module.subscribe(function(moduleID) {
          if (id === moduleID) {
            cb();
          }
        });
      }

      function when_module_removed(id, cb) { //executed before HTML is removed from DOM
        return remove_module.subscribe(function(moduleID) {
          if (id === moduleID) {
            cb();
          }
        });
      }

      KO.bindingHandlers.request_module = {
        init: function(element, valueAccessor, allBindings, viewmodel, bindingContext) {
          return { controlsDescendantBindings: true};
        },

        update: function(element, valueAccessor, allBindings, viewmodel, bindingContext){
          //see https://stackoverflow.com/questions/19422801/knockoutjs-bindinghandler-with-childbindingcontext-data-parent
          var moduleURL = KO.unwrap(valueAccessor()); //see app_module
          moduleURL = moduleURL + "/loader.js";
          update_module(moduleURL, element, allBindings, bindingContext);
        }
      };

      KO.bindingHandlers.load_module = {
        init: function(element, valueAccessor, allBindings, viewmodel, bindingContext) {
          return { controlsDescendantBindings: true};
        },

        update: function(element, valueAccessor, allBindings, viewmodel, bindingContext){
          //see https://stackoverflow.com/questions/19422801/knockoutjs-bindinghandler-with-childbindingcontext-data-parent
          var moduleURL = KO.unwrap(valueAccessor()); //see app_module in /spa/template.html
          var root_folder = get_observable("root_folder");
          moduleURL = root_folder() + moduleURL + "/loader.js";
          update_module(moduleURL, element, allBindings, bindingContext);
        }
      };

      KO.bindingHandlers.default_module = {
        init: function(element, valueAccessor, allBindings, viewmodel, bindingContext) {
          return { controlsDescendantBindings: true};
        },

        update: function(element, valueAccessor, allBindings, viewmodel, bindingContext){
          //see https://stackoverflow.com/questions/19422801/knockoutjs-bindinghandler-with-childbindingcontext-data-parent
          var default_module = KO.unwrap(valueAccessor()); //see app_module in /spa/template.html
          moduleURL = "/app_modules/main/loader.js";
          update_module(moduleURL, element, allBindings, bindingContext, default_module);
        }
      };

      //ajax request html fragment and injects it in element def by selector
      return {
        request_module,

        load_module,

        render_module,

        ready,

        has_observable,

        create_observable,

        get_observable,

        when_element_ready,

        when_module_removed,

        when_app_module_updated,

        when_module_ready,

        update_module

      };
});
