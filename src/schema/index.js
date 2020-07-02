const { gql } = require("apollo-server-express");

const userSchema = require("./user");
const graphSchema = require("./graph");
const vertexSchema = require("./vertex");
const edgeSchema = require("./edge");
const responseSchema = require("./responseSchema");

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
`;

module.exports = [
  linkSchema,
  userSchema,
  graphSchema,
  vertexSchema,
  edgeSchema,
  responseSchema,
];
