const values = [1, 2, 3, 4]

const object = { 
    a: 1, 
    a: 2, 
    b: 2, 
    c: 3 
};

const students = [
    {
        name: "Keven",
        city: "Recife",
        university: {
            name: "POLI",
            city: "Caruaru"
        }
    },
    {
        name: "Giovanna Cunha",
        city: "Recife",
        university: {
            name: "UNICAP",
            city: "Recife"
        }
    }
];

for (let i = 0; i < values.length; i++) {
    console.log(values[i])
}

console.log("-----------")

for (const key in object) {
    console.log(key, object[key]);
}

console.log("-----------")

for (const student of students) {
    for (const key in student) {
        console.log(key, student[key])
    }
}

console.log("-----------")

let i = 0;

while (true) {
    console.log(i, new Date())

    if (i === 50) {
        break;
    }

    i++
}

console.log("-----------")

students.forEach(function (student, index) {
    console.log(student, index)
})