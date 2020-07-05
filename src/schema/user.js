const { gql } = require("apollo-server-express");

const userSchema = gql`
  extend type Query {
    me: User
    allUsers: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    signUp(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): SignUpResponse!
    signIn(login: String!, password: String!): SignInResponse!
    updateEmail(email: String!): updateEmailResponse!
    deleteUser: deleteUserResponse!
  }

  type Token {
    jwt: String!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    graphs: [Graph!]
  }

  type SignUpResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    token: Token
  }

  type SignInResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    token: Token
  }

  type updateEmailResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type deleteUserResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }
`;

module.exports = userSchema;
