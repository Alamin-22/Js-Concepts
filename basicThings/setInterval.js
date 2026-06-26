console.log(1)
console.log(2)
console.log(3)
let num=0;
const IntervalId=setInterval(() => {
    console.log( ++num)
    if(num === 10){
        clearInterval(IntervalId);
    }
}, 1000)
console.log(5)
console.log(6)
console.log(7)
console.log(8)