var string = "Hello World";
var myNum = 32;
var myArray = ["Smartphone", "Tablet", "Laptop"];
var myObj = {
	property1: "first",
	propertyTwo:"second",
	property3: "Third"
};

for (var i = 0; i < myArray.length; i++){
	alert("The current value of my Array is : " + myArray[i]);
}

try{
//code to execute goes here 
}

catch (err){
//code to catch a runtime error goes here 
g_form.addErrorMessage("A runtime error has occured:" + err);
}

