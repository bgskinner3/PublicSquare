import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
      password
      profileImg
      posts {
        description
        title
        topic
        pollresults
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query user($token: String!) {
    user(token: $token) {
      id
      username
      password
      profileImg
      posts {
        description
        title
        topic
        pollresults
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      description
      title
      topic
      pollresults
      pollcountfalse
      pollcounttrue
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query GetSinglePost($postId: ID!) {
    post(id: $postId) {
      id
      description
      title
      topic
      pollresults
      pollcountfalse
      pollcountfalse
    }
  }
`;

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      tokenExpiration
      token
    }
  }
`;

export const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      userId
  }
`;
