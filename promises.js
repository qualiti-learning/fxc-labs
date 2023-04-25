const users = [
  { active: true, id: 1, name: 'Keven Leone' },
  { active: true, id: 2, name: 'Igor Vitor' },
  { active: false, id: 3, name: 'Sidney Lima' },
];

const movies = [
  { id: 1, userId: 1, name: 'Interestelar' },
  { id: 2, userId: 1, name: 'Harry Potter' },
  { id: 3, userId: 1, name: 'Batman' },
];

// function getUserMovies(id, callback) {
//   setTimeout(() => {
//     const movie = movies.filter((movie) => movie.userId === id);

//     callback(movie);
//   }, 2000);
// }

// function getUser(id, callback) {
//   setTimeout(() => {
//     const user = users.find((user) => user.id === id);

//     callback(user);
//   }, 2000);
// }

// getUser(1, (user) => {
//     console.log(user);

//     getUserMovies(user.id, (movie) => {
//       console.log(movie);
//     });
//   });

function getUserPromised(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.id === id);

      if (user) {
        return resolve(user);
      }

      reject(new Error('Usuário não existe...'));
    }, 2000);
  });
}

function getUserMoviesPromised(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const movie = movies.filter((movie) => movie.userId === id);

      resolve(movie);
    }, 2000);
  });
}

//   const [user, userMovies] = await Promise.all([
//     getUserPromised(1),
//     getUserMoviesPromised(1),
//   ]);

// getUserPromised(10)
//   .then((user) => {
//     console.log(user);

//     getUserMoviesPromised(user.id).then((movies) => {
//       console.log(movies);
//     });
//   })
//   .catch((error) => console.error(error));

async function main(userId) {
  try {
    const user = await getUserPromised(userId);
    const userMovies = await getUserMoviesPromised(userId);

    console.log({ user, userMovies });
  } catch (error) {
    console.error(error);
  }
}

main(10);
