define([
  "loader"
], function(loader) {

      console.log("Footer Loader created!");

      return loader.load_module({
        htmlURL: '/modules/footer/footer.html',
        cssURL: '/modules/footer/footer.css',
        //modelURL: '/modules/footer/footer.js',
        elSelector: '#module-footer'
      });

});
