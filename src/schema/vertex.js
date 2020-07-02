const { gql } = require("apollo-server-express");

const vertexSchema = gql`
  extend type Query {
    vertex(id: ID!): Vertex
  }

  extend type Mutation {
    createVertex(
      data: String!
      x: Int
      y: Int
      graphId: ID!
    ): VertexMutationResponse!
    updateVertexData(id: ID!, data: String!): VertexMutationResponse!
    updateVertexCoordinates(x: Int!, y: Int!): VertexMutationResponse!
    deleteVertex(id: ID!): VertexMutationResponse!
  }

  type Vertex {
    id: ID!
    data: String!
    x: Int
    y: Int
    targets: [Vertex!]
    graph: Graph!
  }

  type VertexMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    vertex: Vertex
  }
`;

module.exports = vertexSchema;
