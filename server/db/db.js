// const Sequelize = require('sequelize');
// const pkg = require('../package.json');

// const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}_test` : pkg.name;

// const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
//   logging: false,
// });

// module.exports = db;

const Sequelize = require('sequelize');
//const packageJson = require('../package.json');

// console.log(chalk.blue(`Opening database connection to ${packageJson.name}`));

const databaseName = 'stackathon'
const config = {
  logging: false,
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

console.log(`Opening database connection to ${databaseName}`);
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);

module.exports = db;
