/* eslint-disable no-unused-vars */
const { User } = require('../db/models/User');
const { Post } = require('../db/models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'f1BtnWgD3VKY';

const resolvers = {
  Query: {
    //User Queries
    users: async (parent, args, context) => {
      const users = await User.findAll();
      return users;
    },
    user: async (parent, args, context) => {
      const { id } = jwt.verify(args.token, JWT_SECRET);
      const user = await User.findByPk(id);
      console.log(user);
      return user;
    },
    //Post Queries

    posts: async (parent, args, context) => {
      // if (!context.user) throw new Error('Not authorized')
      const posts = await Post.findAll();
      return posts;
    },
    post: async (parent, args) => {
      const id = args.id;
      const post = await Post.findByPk(id);
      return post;
    },
  },
  User: {
    posts: async (parent, args) => {
      const posts = await Post.findAll({
        where: {
          userId: parent.id,
        },
      });
      return posts;
    },
  },
  //mutations
  Mutation: {
    createUser: async (parent, args) => {
      const existingUser = await User.findOne({
        where: {
          username: args.input.username,
        },
      });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      console.log({ ...args.input });
      const user = await User.create({ ...args.input });
      // console.log(user)
      // await user.save();
      return user;
    },

    updateUser: async (parent, args) => {
      const { id, newUsername, newPassword } = args.input;
      const user = await User.findByPk(id);
      user.set({
        username: newUsername || user.username,
        password: newPassword || user.password,
      });
      await user.save();
      return user;
    },
    deleteUser: async (parent, args) => {
      const id = args.id;
      const user = await User.findByPk(id);
      await user.destroy();
    },
    login: async (parent, args, context) => {
      try {
        const user = await User.findOne({ where: { username: args.username } });

        if (!user) {
          throw new Error('User does not exist!');
        }

        const isValid = await bcrypt.compare(args.password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        // return jwt
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    signup: async (parent, args, context) => {
      try {
        const { req, res } = context;
        console.log(req);

        const existingUser = await User.findOne({
          where: {
            username: args.username,
          },
        });
        if (existingUser) {
          throw new Error('User exists already.');
        }

        const user = await User.create({ ...args });

        const token = await user.generateToken();

        //await user.save();

        return {
          user,
          token,
        };
      } catch (error) {
        console.error('signup failed!', error);
      }
    },

    updatePost: async (parent, args) => {
      console.log(args);
      const {
        id,
        newdescription,
        newtopic,
        newtitle,
        newpollcounttrue,
        newpollcountfalse,
        newpollresults,
      } = args.input;
      const post = await Post.findByPk(id);
      post.set({
        description: newdescription || post.description,
        topic: newtopic || post.topic,
        title: newtitle || post.title,
        pollcounttrue: newpollcounttrue,
        pollcountfalse: newpollcountfalse || post.pollcountfalse,
        pollresults: newpollresults || post.pollresults,
      });
      await post.save();
      return post;
    },
    createPost: async (parent, args) => {
      const post = args.input;

      await Post.create(post);

      return post;
    },
    deletePost: async (parent, args) => {
      const id = args.id;
      const post = await Post.findByPk(id);
      await post.destroy();
    },
  },
};

module.exports = { resolvers };
