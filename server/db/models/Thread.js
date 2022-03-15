const Sequelize = require('sequelize');
const db = require('../db');


const Thread = db.define("thread", {
  users: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = {Thread}