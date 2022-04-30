define([
  "jquery",
  "knockout"
], function($, KO) {

      console.log("Executing Module app loader ...");

      var observables = {};

      function request_module(dependencies) {
        var htmlPromise, cssPromise, viewModelPromise, argsPromise
        var {id, htmlURL, cssURL, viewModelURL, viewModel} = dependencies;

        console.log("Requesting Module:", id, htmlURL, cssURL, viewModelURL, viewModel);

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

        return Promise.all([htmlPromise, cssPromise, viewModelPromise, argsPromise]).then(function([html, css, ViewModel, args]){
          console.log("request_module: html, css, model dependencies resolved for module:", id);
          var viewModel;
          if (ViewModel) {
            console.log("creating viewModel:", id, ViewModel);
            if (typeof ViewModel === "function") { //true if model module returns a function
              viewModel = new ViewModel(args);
            } else {
              viewModel = ViewModel;
            }
          }
          return { id, html, css, viewModel };
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
        console.log("request_render_child: For ", el);
        return promiseModule.then(function(module){
          console.log("rendering child module:", module.id);
          var { html, css, viewModel } =  module;
          el && css && $(el).append('<style type="text/css">' + css + '</style>');
          el && html && $(el).append(html);
          if (el && viewModel) {
            try {
              var childContext = viewModel;
              if (bindingContext) {
                childContext = bindingContext.createChildContext(viewModel);
                console.log("created new knockout child context:", childContext);
              }
               KO.applyBindingsToDescendants(childContext, el);
            } catch(e) {
              console.error(e, "element:", el, "viewModel:", viewModel);
            }
          }
          return module;
        });
      }

      function request_render_submodule(modulePromise, submoduleURL, selector ) {
        modulePromise = !modulePromise ? Promise.resolve() : modulePromise;
        return modulePromise.then(function(module){
          console.log("requesting submodule", submoduleURL);
          return System.import(submoduleURL).then(function(subModule) {
            console.log("submodule", submoduleURL, "resolved.");
            var submodule = subModule.default;
            var el = document.querySelector(selector);
            return request_render_child(submodule, el).then(function(submodule){
              console.log("submodule", submoduleURL, "rendered.");
              return subModule.default;
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
        if (!this.has_observable(id)) {
          observables[id] = KO.observable(value);
        }
        return observables[id];
      }

      function get_observable(id) {
        return observables[id];
      }

      function request_content(contentURL) {
        var header = request_module({
          id: 'module-header',
          htmlURL: '/app_modules/header/header.html',
          cssURL: '/app_modules/header/header.css',
          viewModelURL: '/app_modules/header/header.js'
        });
        var footer = request_module({
          id: 'module-footer',
          htmlURL: '/app_modules/footer/footer.html',
          cssURL: '/app_modules/footer/footer.css',
          viewModelURL: '/app_modules/footer/footer.js'
        });
        /*
         * Request menu and content modules to inject in app body
         */
        var body = request_module({
          id:'module-menu',
          htmlURL: '/app_modules/menu/menu.html',
          cssURL: '/app_modules/menu/menu.css',
          viewModel: {
            url: '/app_modules/menu/menu.js',
            args: {
              url: contentURL,
              selector: '#app-content'
            }
          }
        });
        header = request_render(header, "#app-header");
        footer = request_render(footer, "#app-footer");
        body = request_render(body, '#app-body');
        return [header, footer, body];
      }

      //ajax request html fragment and injects it in element def by selector
      return {
        request_module,

        request_render,

        request_render_child,

        request_render_submodule,

        ready,

        has_observable,

        create_observable,

        get_observable,

        request_content
      };
});
