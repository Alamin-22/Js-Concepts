console.log(1)
console.log(2)
setTimeout(() => {
    console.log(`alisha log`)
}, 4000 /* mili sec */)
console.log(4)
console.log(5)
console.log(6)
let num=0;
const intervalId=setInterval(() => {
    console.log( num ++)
}, 4000)