/* 
Q11: What is the true difference between .call(), .apply(), and .bind()?
Answer: All three methods explicitly dictate what the internal this keyword points to when a function is executed, but they trigger differently:
.call(): Invokes the target function immediately, passing context arguments down one by one, separated by commas.
.apply(): Invokes the target function immediately, but packs and passes context arguments together inside a single array.
.bind(): Does not execute the function. It returns an entirely new function structure with the bound context locked in permanently, so you can store and trigger it later.

*/
