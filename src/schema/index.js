const { gql } = require("apollo-server-express");

const userSchema = require("./user");
const graphSchema = require("./graph");
const vertexSchema = require("./vertex");
const edgeSchema = require("./edge");

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;

module.exports = [
  linkSchema,
  userSchema,
  graphSchema,
  vertexSchema,
  edgeSchema,
];
