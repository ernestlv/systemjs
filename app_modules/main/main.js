define([
    "custom-knockout-bindings"
], function() {

  console.log("7 Executing main Module...");

  return {
    message:"Main Context!!!",
    secondContext:{
      message:"Child Context!!!"
    }
  }

});
