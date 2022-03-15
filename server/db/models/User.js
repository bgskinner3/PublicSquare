const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   notEmpty: true,
    // },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    // validate: {
    //   //min length
    // len: [6, 20],
    // },
  },
  profileImg: {
    type: Sequelize.STRING,
    defaultValue:
      'https://pbs.twimg.com/profile_images/1499451875241963520/grz8eQiD_400x400.png',
  },
});

User.prototype.correctPassword = async function (pwd) {
  //we need to compare the plain version to an encrypted version of the password


  const x = await bcrypt.compare(pwd, this.password);

  return x;
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, 'f1BtnWgD3VKY', {
    expiresIn: '1h',
  });
};

User.authenticate = async function ({ username, password }) {

  const user = await this.findOne({ where: { username } });

  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect email/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, 'f1BtnWgD3VKY');
    //, process.env.SECRET_KEY
    const user = User.findByPk(id);
    if (!user) {
      console.log("you're not a user");
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

module.exports = { User };
