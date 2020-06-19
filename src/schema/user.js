const { gql } = require("apollo-server-express");

const userSchema = gql`
  extend type Query {
    me: User
    allUsers: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): User!
    updateEmail(id: ID!, email: String!): User!
    deleteUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    graphs: [Graph!]
  }
`;

module.exports = userSchema;
