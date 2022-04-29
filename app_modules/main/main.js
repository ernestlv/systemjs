define([
    "custom-knockout-bindings"
], function() {

  console.log("7 Executing main Module...");

  return {
    message:"Main Context!!!",
    childContext:{
      message:"Child Context!!!"
    }
  }

});
