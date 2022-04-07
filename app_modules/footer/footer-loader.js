define([
  "loader"
], function(loader) {

      console.log("Executing Footer Loader...");

      return loader.request_module({
        id: 'app-footer',
        htmlURL: '/app_modules/footer/footer.html',
        cssURL: '/app_modules/footer/footer.css'
        //modelURL: '/app_modules/footer/footer.js'
      });

});
