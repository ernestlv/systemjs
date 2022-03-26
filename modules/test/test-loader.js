define([
  "loader"
], function(loader) {

      console.log("Test Loader created!");

      return loader.load_module({
        htmlURL: '/modules/test/test.html',
        cssURL: '/modules/test/test.css',
        modelURL: {
          url: '/modules/test/test.js',
          args: {
            arg1:"Hello",
            arg2:"World!!!"
          }
        },
        elSelector: '#module-test'
      }).then(function(res){
        System.import("/modules/planet.js").then(function(module) {
          var planet = module.default;
          var koModel = res.koModel;
          koModel.planet(planet.name);
        });
      });

});
