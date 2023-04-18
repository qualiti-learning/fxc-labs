function sum(...values) {
    let total = 0

    for (const value of values) {
        total += value;
    }

    return total
}

console.log(sum(1,2,3,4,5))


const getEmail = () => 'keven12391203@qwe.qweomc'

const sayHello = (user) => `Username: ${user}`
