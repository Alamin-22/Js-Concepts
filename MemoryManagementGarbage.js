/* 
Q9: How does Memory Management and Garbage Collection function under the hood?
Answer: JavaScript automatically manages memory life cycles using a built-in Garbage Collector executing a "Mark-and-Sweep" algorithm. The collector regularly evaluates objects starting from the global root scope, "marking" everything that can still be reached by your code. Any object left unmarked is deemed unreachable and is "swept" away to clear memory space.
The Trap: Memory leaks happen when your code maintains an unintentional live reference to an item you no longer need—such as an active interval timer reference or an event listener context pointing to a removed element—preventing the engine from sweeping it out.

*/
