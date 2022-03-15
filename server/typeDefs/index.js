const { gql } = require('apollo-server-express');

//AuthData type def used return the user query to check for the jwt token

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String
    profileImg: String
    posts: [Post]
  }
  type UserPosts {
    postId: ID!
    userId: ID!
  }

  type Post {
    id: ID!
    title: String!
    description: String
    topic: String
    pollcounttrue: Int
    pollcountfalse: Int
    pollresults: Boolean
    userId: ID
  }
  type Message {
  id: ID!
  content: String!
  userId: ID!
  currentChatReceiverId: ID
  threadId: ID
  }
  type Query {
    users: [User!]!
    user(token: String!): User!
    posts: [Post!]!
    post(id: ID!): Post!
    message(id: ID!): Message!
    messages: [Message!]!
  }
  input UserInput {
    email: String!
    password: String!
  }
  input CreateUserInput {
    username: String!
    password: String!
    profileImg: String
  }
  input UpdateUserInput {
    id: ID!
    newUsername: String
    newPassword: String
    newprofileImg: String
  }
  input UpdatePostInput {
    id: ID!
    newdescription: String
    newtopic: String
    newtitle: String
    newpollcounttrue: Int
    newpollcountfalse: Int
    newpollresults: Boolean
  }
  input CreatePostInput {
    title: String!
    description: String!
    topic: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    signup(username: String!, password: String!): AuthPayload!
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User!
    createPost(input: CreatePostInput!): Post!
    updatePost(input: UpdatePostInput!): Post!
    deleteUser(id: ID!): User
    deletePost(id: ID!): Post
  }
`;

module.exports = { typeDefs };
