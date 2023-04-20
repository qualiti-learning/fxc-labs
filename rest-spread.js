const university = {
  name: "UNICAP",
  city: "Recife",
}

const universityAddress = {
  address: "Boa Vista"
} 

const student = {
  name: "Maria Clara",
  grade: 2,
  university: {
    ...university,
    address: "Boa Viagem"
  }
}

const student2 = {
  name: "Keven Leone",
  grade: 8,
  university: {
    ...university,

  }
}

const getGithubUser = (user) => ({
  login: user,
  id: new Date().getTime(),
  bio: 'Javascript Developer',
  values: [1, 2],
});

const getGithubUsers = (users) => users.map((user) => getGithubUser(user));



const users = [
  'kevenleone',
  'jose',
  'pedro',
]

const [{ login: firstUserLogin, id: firstUserId }, , ...otherUsers] = 
  getGithubUsers([...users, 'mariaclara', 'edson']);

const usersCSV = 'keven,julia,rafael,edson,pedro,jose'

const [userA, userB, ...otherUserCSV] = usersCSV.split(',')
const {login, id, ...githubUser} = getGithubUser('kevenleone')

console.log(login, githubUser)


// const login = githubUser.login;
// const id = githubUser.id;
// const bio = githubUser.bio;
