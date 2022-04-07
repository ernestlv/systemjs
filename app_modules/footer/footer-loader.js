define([
  "app"
], function(app) {

      console.log("Executing Footer Loader...");

      return app.request_module({
        id: 'app-footer',
        htmlURL: '/app_modules/footer/footer.html',
        cssURL: '/app_modules/footer/footer.css'
        //viewModelURL: '/app_modules/footer/footer.js'
      });

});
