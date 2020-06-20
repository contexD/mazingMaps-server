const { gql } = require("apollo-server-express");

const vertexSchema = gql`
  extend type Query {
    allVertices: [Vertex!]
    vertex(id: ID!): Vertex
  }

  extend type Mutation {
    createVertex(data: String!, graphId: ID!): Vertex!
    updateVertexData(id: ID!, data: String!): Vertex!
    deleteVertex(id: ID!): Boolean!
  }

  type Vertex {
    id: ID!
    data: String!
    targets: [Vertex!]
    graph: Graph!
  }
`;

module.exports = vertexSchema;
