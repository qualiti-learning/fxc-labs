// console.log('Inicio...');

// const execute = (type) => () => console.log(type, 'Test...');

// setTimeout(execute('timeout'), 1000);
// setInterval(execute('interval'), 5000);

function forEach(values, callback) {
  const newValues = [];
  for (const value of values) {
    newValues.push(callback(value));
  }

  return newValues;
}

// in -> [1,2,3]
// out -> [10, 20, 30]

const values = [1, 2, 3];

const valuesUpdated = forEach(values, function (value) {
  return value * 10;
});

console.log({ values, valuesUpdated });
