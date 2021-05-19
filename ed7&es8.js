const str = '';
//padStart adds padding or any letter at start of string
console.log(str.padStart(10, "HI"));//HIHIHIHIHI
// though this is same it will only print out javascript cuz length is 10
console.log(str.padStart(10, "Javascript Mastrey"));

const muNum = "123";// length 3
console.log(muNum.padEnd(5, ".0323423"));//123.0
// here as the length of munum is 3 and we secify paddEnd at 5 it will just add remaining 2 decimals i.e .0
// also if padEnd is length specified is less than munum length it wont print anything


// object values
const obj = {
  name: "jason",
  age:32
} 
console.log(Object.values(obj))// prints only values[ 'jason', 32 ] 
console.log(Object.entries(obj))//[ [ 'name', 'jason' ], [ 'age', 32 ] ]
// Exponentiation

console.log(2 ** 3)// 8  similar to Math.pow(2, 3)





