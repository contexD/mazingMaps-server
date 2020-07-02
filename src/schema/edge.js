const { gql } = require("apollo-server-express");

const edgeSchema = gql`
  extend type Mutation {
    createEdge(sourceId: ID!, targetId: ID!): EdgeMutationResponse!
    deleteEdge(sourceId: ID!, targetId: ID!): EdgeMutationResponse!
  }

  type Edge {
    source: Vertex!
    target: Vertex!
  }

  type EdgeMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    edge: Edge
  }
`;

module.exports = edgeSchema;
