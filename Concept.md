Js is a single single threaded synchronous language.
Here is the 4 pillar that describe how js fundamentally works

## 1. The call Stack (Main Thread)

It works in a CallStack(LIFO). Which means every single line of code of synchronous logic are stored in CallStack. For example if you even write console.log("something") it also store in CallStack First. And According to CallStack behavior it acts like Last in first out.

CallStack or Stack is a kind of bucket and works like pouring something in it . As a result the first line of code is added to the Stack which is set at the end of the bucket. and Following this pattern it read the code top to bottom like this
Line 1 of Sync Code
Line 2 of Sync Code
Line 3 of Sync Code
Line 4 of Sync Code

generally push into stack like this(Because the first line it read is pushed into call stack meaning putting at the bottom of the bucket)
Line 4 of Sync Code
Line 3 of Sync Code
Line 2 of Sync Code
Line 1 of Sync Code

And then the code runs according to CallStack which is Top To Bottom Because the behavior of Stack is (Last In first out).
Meaning the execution will be happen in this pattern
Line 4 of Sync Code ↓
Line 3 of Sync Code ↓
Line 2 of Sync Code ↓
Line 1 of Sync Code ↓

## 2. Web Apis(The Background worker)

JavaScript itself does not know what a timer (setTimeout) or a network request (fetch) is. These are features provided by the browser (or Node.js). When JavaScript hits a setTimeout, it says to the browser, "Hey, hold onto this callback function and count to 5 seconds. I'm going to keep reading the rest of the code.

## 3. The Queues (The Waiting Rooms)

When the browser finishes its background task (like counting to 5, or downloading data), it cannot just shove the code back into the Call Stack and interrupt whatever JavaScript is currently doing. Instead, it places the finished task into a waiting room.

There are two waiting rooms:

#### \* The Macrotask Queue (Task Queue): This is the slow lane. It holds callbacks from setTimeout, setInterval, and DOM events (like clicks).

#### \*The Microtask Queue: This is the VIP fast lane. It holds callbacks from Promises.

## 4. The Event Loop (The Traffic Cop)

The Event Loop has one incredibly simple job. It constantly looks at the Call Stack and asks: "Is the Call Stack empty?"

If the Call Stack is empty, it moves tasks from the queues into the Call Stack to be executed. But it follows a strict Golden Rule:
The Event Loop will empty the ENTIRE Microtask Queue (Promises) before it allows a single task from the Macrotask Queue (setTimeout) to run.
