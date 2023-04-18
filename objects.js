const number = 123;
const array = [];
const date = new Date();

const values = [1, 2, 3];
const object = { a: 1, b: 2, values };

console.log(values, JSON.stringify(values));
console.log(object, JSON.stringify(object));

console.log(JSON.parse(`{"a":1,"b":2,"values":[1,2,3]}`));

// number.toExponential();
// array.forEach();
