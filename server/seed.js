'use strict';

const { db, User, Post } = require('./db');
const { PostList, UserList } = require('./testData');



async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log('db synced!');

    //Creating Posts
    await Promise.all(
      PostList.map((post) => {
        return Post.create(post);
      })
    );

    //Creating Users
    await Promise.all(
      UserList.map((user) => {
        return User.create(user);
      })
    );
  } catch (error) {
    console.error('syncing dummy data did not work', error);
  }
}

module.exports = seed;

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}