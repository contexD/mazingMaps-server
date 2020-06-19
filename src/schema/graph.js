const { gql } = require("apollo-server-express");

const graphSchema = gql`
  extend type Query {
    allGraphs: [Graph!]
    graph(id: ID!): Graph
  }

  extend type Mutation {
    createGraph(name: String!, userId: ID!): Graph!
    updateGraphName(id: ID!, name: String!): Graph!
    deleteGraph(id: ID!): Boolean!
  }

  type Graph {
    id: ID!
    name: String!
    user: User!
    vertices: [Vertex!]
  }
`;

module.exports = graphSchema;
