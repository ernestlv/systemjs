define([
  "loader"
], function(loader) {

      console.log("Executing Footer Loader...");

      var module = loader.request_module({
        htmlURL: '/app_modules/footer/footer.html',
        cssURL: '/app_modules/footer/footer.css',
        //modelURL: '/app_modules/footer/footer.js',
        elSelector: '#module-footer'
      });

      return loader.request_render([module]);

});
