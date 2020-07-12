const { gql } = require("apollo-server-express");

const edgeSchema = gql`
  extend type Mutation {
    createEdge(sourceId: ID!, targetId: ID!): EdgeMutationResponse!
    deleteEdge(id: ID!): EdgeMutationResponse!
  }

  type Edge {
    id: String!
    source: ID!
    target: ID!
    animated: Boolean
  }

  type EdgeMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    edge: Edge
  }
`;

module.exports = edgeSchema;
