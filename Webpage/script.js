var myName; 
let myAge; 
myName = 'Jeremiah Mulumbi';
myAge = 22;
const myUserID = 123454313;
let myJob = 'Software Engineer'

let dictionary = [
    {firstName: 'Jeremiah Mulumbi',
    myAge: 25,
    myJob: 'System Support'
    },
    {firstName: 'Jacob Short',
    myAge: 27,
    myJob: 'System Analyst'
    }
]

console.log('My name is ' + myName);
console.log('I am ' + myAge);
console.log('My userID is ' + myUserID);
console.log(`My name is ${myName} and I am ${myAge} years old. My current job is ${myJob} and my userID is ${myUserID}`)
console.log(`My name is ${dictionary[1].firstName} and I am ${dictionary[1].myAge} years old. My current job is ${dictionary[1].myJob} and my userID is ${myUserID}`)



