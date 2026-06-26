/* 
Q4: What do you understand about Closures in JS?
In simple words,, when a parent function contains a child function and that child function depends on a variable that is declared into the parent function,, and when the parent function executed the child still can access that variable , this is called Closures in js. 
*/

const parentFunction = () => {
  let parentVariable = "variable is coming from parent";

  const childFunction = () => {
    console.log(parentVariable);
  };

  return childFunction;
};

/* 
basically it fist call the parent one and it finish its work then we call the child one and get the same result even after finishing the parent function. 

this behavior is basically done by js Lexical Scoping.  
*/

//  Parent function executes and finishes
const myClonedChild = parentFunction();

//  Parent is gone, but the child still remembers the variable!
myClonedChild();
