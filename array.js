const map = new Map();
const obj = {a: 1}

let values = [
    {active: true, id: 1, name: "Keven Leone"}, 
    {active: true, id: 2, name: "Igor Vitor"},
    {active: false, id: 3, name: "Sidney Lima"}
]

const set = new Set(values);

const loggedUserId = 21;

const findByLoggedUserId = (value) => value.id === loggedUserId

const loggerUser = values.find(findByLoggedUserId)
const loggedUserindex = values.findIndex(findByLoggedUserId)
const activeUsers = values.filter((value) => value.active === true)

const users = values.map((value) => ({
    ...value,
    name: value.name.toUpperCase(),
    email: `${value.name
            .replace(" ", "")
            .toLowerCase()}@unicap.br`
}));

const allUsersActive = users.every((user) => user.active === true);
const someUsersActive = users.some((user) => user.active === true);

console.log({allUsersActive, someUsersActive})


// console.log({loggerUser, loggedUserindex,  activeUsers})



// values.pop()
// values.pop()
// values.unshift(10)
