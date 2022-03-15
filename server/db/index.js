const db = require('./db');
const { Post } = require('./models/Post');
const { User } = require('./models/User');
const {Message} = require('./models/Message')
const {Thread} = require('./models/Thread')
const {UserThread} = require('./models/UserThread')

User.hasMany(Post);
Post.belongsTo(User);


//message system below simple version 
User.hasMany(UserThread);
UserThread.belongsTo(User)

Thread.hasMany(UserThread)
UserThread.belongsTo(Thread)

Thread.hasMany(Message)
Message.belongsTo(Thread)

User.hasMany(Message)
Message.belongsTo(User)





module.exports = {
  UserThread,
  Thread,
  Message,
  User,
  Post,
  db,
};
