const { gql } = require("apollo-server-express");

const graphSchema = gql`
  extend type Query {
    allGraphs: [Graph!]
    graph(id: ID!): Graph
  }

  extend type Mutation {
    createGraph(name: String!): GraphMutationResponse!
    updateGraphName(id: ID!, name: String!): GraphMutationResponse!
    deleteGraph(id: ID!): GraphMutationResponse!
  }

  type Graph {
    id: ID!
    name: String!
    user: User!
    vertices: [Vertex!]
    edges: [Edge!]
  }

  type GraphMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    graph: Graph
  }
`;

module.exports = graphSchema;
