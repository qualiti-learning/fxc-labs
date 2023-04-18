const getGithubUser = (user) => ({
  login: user,
  id: new Date().getTime(),
  bio: 'Javascript Developer',
  values: [1, 2],
});

const getGithubUsers = (users) => users.map((user) => getGithubUser(user));

const [, , { login: thirdUserLogin, id: thirdUserId }] = getGithubUsers([
  'kevenleone',
  'jose',
  'pedro',
]);

const {
  photo: userPhoto = '...',
  login,
  values: [a, b, c = 0, d = a],
} = getGithubUser('kevenleone');

console.log(photo);

// const login = githubUser.login;
// const id = githubUser.id;
// const bio = githubUser.bio;
