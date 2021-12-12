const str = '';
//padStart adds padding or any letter at start of string
console.log(str.padStart(10, 'HI')); //HIHIHIHIHI
// though this is same it will only print out javascript cuz length is 10
console.log(str.padStart(10, 'Javascript Mastrey'));

const muNum = '123'; // length 3
console.log(muNum.padEnd(5, '.0323423')); //123.0
// here as the length of munum is 3 and we secify paddEnd at 5 it will just add remaining 2 decimals i.e .0
// also if padEnd is length specified is less than munum length it wont print anything

// object values
const obj = {
  name: 'jason',
  age: 32,
};
console.log(Object.values(obj)); // prints only values[ 'jason', 32 ]
console.log(Object.entries(obj)); //[ [ 'name', 'jason' ], [ 'age', 32 ] ]
// Exponentiation

console.log(2 ** 3); // 8  similar to Math.pow(2, 3)

const obj1 = { a: 1 };
const obj2 = { a: 1 };
// console.log(Object.is(obj1, obj1)); //true
// console.log(Object.is(obj1, obj2)); //false
// console.log({ ...obj1 }); //{a:1}
// console.log(Object.is(obj1, { ...obj1 })); //false
// console.log(obj1 === obj2, obj1 === obj1, obj1 === { ...obj1 }); //false true false

//By definition a frozen object is sealed
console.log(Object.isFrozen(obj1)); //false
obj1.b = 2;
console.log(obj1); //{ a: 1, b: 2 }
Object.freeze(obj1); //not extensible
obj1.b = 3; //not applied
obj1.c = 3; //not applied
console.log(obj1); //{ a: 1, b: 2 }
console.log(Object.isFrozen(obj1)); //true
console.log(Object.isExtensible(obj1)); //false
console.log(Object.isSealed(obj1)); //true

//a frozen object can never be unfrozen. One way is to create a new obj and copy props from the frozen one
const obj3 = obj1;
console.log(Object.isFrozen(obj3)); //true
const obj4 = { ...obj1 };
console.log(Object.isFrozen(obj4)); //false

const arr = [{ a: 1 }, { b: 2 }];
const myobj = { a: 3, c: 4 };
console.log(Object.assign(myobj, ...arr)); //{ a: 1, c: 4, b: 2 }
//object.assign cannot do deep cloning it will copy the reference if a object property hold a reference to some other obj/arr
//doing JSON.stringify will be better but also wont work with dates
obj4.f = 4;
//sd prop does not shows up on logging the object needs to be acccessed manually
Object.defineProperty(obj4, 'sd', {
  value: 23,
});
console.log(obj4); //{ a: 1, b: 2, f: 4 }
console.log(obj4.sd); //23
//proxy gives access to intercept and modify object value
const target = { msg1: 'hi', msg2: 'YO' };
const handler = {};
const proxy1 = new Proxy(target, handler);
console.log(proxy1.msg1, target.msg2); //hi YO
handler.get = function (target, prop, receiver) {
  return 'who';
};
const proxy2 = new Proxy(target, handler);
console.log(proxy2.msg1, target.msg2); //who YO
handler.get = function (target, prop, receiver) {
  if (prop === 'msg2') {
    return 'world';
  }
  return Reflect.get(...arguments); // try returning {...arguments } here
};
console.log(proxy1.msg1, proxy1.msg2); //hi world
