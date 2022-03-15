const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  topic: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  pollcounttrue: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }, 
  pollcountfalse: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  pollresults: {
    type: Sequelize.BOOLEAN,
    defaultValue: null
  },
});

module.exports = { Post };
