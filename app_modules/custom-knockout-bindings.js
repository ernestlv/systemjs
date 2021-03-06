define([
  "jquery",
  "knockout",
  "loader"
], function($, KO, loader) {

      console.log("Exectuing custom knockout bindings Module...");

      KO.bindingHandlers.upperX = { //custom binding
        update: function(element, valueAccessor) {
          var value = KO.unwrap(valueAccessor());
          $(element).html(value.toUpperCase());
        }
      };

      KO.bindingHandlers.with_context = {
        init: function(element, valueAccessor, allBindings, viewmodel, bindingContext){
          //see https://stackoverflow.com/questions/19422801/knockoutjs-bindinghandler-with-childbindingcontext-data-parent
          var childContext = valueAccessor();
          console.log("create new knockout child context for", childContext);
          childContext = bindingContext.createChildContext(childContext);
          KO.applyBindingsToDescendants(childContext, element)
          return { controlsDescendantBindings: true};
        }
      };

});
