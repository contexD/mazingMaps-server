const { gql } = require("apollo-server-express");

const edgeSchema = gql`
  extend type Mutation {
    createEdge(sourceId: ID!, targetId: ID!): Edge!
    deleteEdge(sourceId: ID!, targetId: ID!): Boolean!
  }

  type Edge {
    source: Vertex!
    target: Vertex!
  }
`;

module.exports = edgeSchema;
