define([
  "loader"
], function(loader) {

      console.log("Executing Footer Loader...");

      var module = loader.request_module({
        id: 'app-footer',
        htmlURL: '/app_modules/footer/footer.html',
        cssURL: '/app_modules/footer/footer.css',
        //modelURL: '/app_modules/footer/footer.js',
        elSelector: '#app-footer'
      });

      return loader.request_render([module]);

});
