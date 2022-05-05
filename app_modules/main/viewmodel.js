define([
    "jquery", //required by bootstrap
    "bootstrap",
    "custom-knockout-bindings"
], function() {

  console.log("Executing main Module...");

  return {
    message:"This web app uses the AMD pattern thru SystemJS and the MVVM pattern thru jQuery & Knockout. Additionally, it uses Bootstrap CSS to render view components.",
    childContext:{
      message:"Hello from child context!!!"
    }
  }

});
