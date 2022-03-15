const { ApolloServer } = require('apollo-server');
const JWT_SECRET = 'f1BtnWgD3VKY';

const jwt = require('jsonwebtoken');
const { resolvers } = require('./resolvers');

const { typeDefs } = require('./typeDefs/index');
const { db, User } = require('./db')


require('dotenv').config();

const getUser = async (token) => {
  try {
    if (token) {
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(id);
      return user;
    }
    return null;
  } catch (error) {
    console.log('ERRRRRRRR', error);
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.get('Authorization') || '';
    if (token && token.length) {
      const user = await getUser(token.replace('Bearer ', ''));
      
      return { user };
    } else {
      
     
      return {  };
    }
  },
  introspection: true,
  playground: true,
});

const startServer = async () => {
  await db.sync()

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer()
