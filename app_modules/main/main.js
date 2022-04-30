define([
    "custom-knockout-bindings"
], function() {

  console.log("Executing main Module...");

  return {
    message:"Hello World!!!",
    childContext:{
      message:"Hello from child context!!!"
    }
  }

});
