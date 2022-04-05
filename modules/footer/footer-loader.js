define([
  "loader"
], function(loader) {

      console.log("Executing Footer Loader...");

      var module = loader.request_module({
        htmlURL: '/modules/footer/footer.html',
        cssURL: '/modules/footer/footer.css',
        //modelURL: '/modules/footer/footer.js',
        elSelector: '#module-footer'
      });

      return loader.request_render([module]);

});
