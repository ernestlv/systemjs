define([
  "loader"
], function(loader) {

      console.log("Table Loader created!");

      return loader.load_module({
        htmlURL: '/modules/table/table.html',
        cssURL: '/modules/table/table.css',
        modelURL: '/modules/table/table.js',
        elSelector: '#module-table'
      });
});
