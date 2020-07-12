const { gql } = require("apollo-server-express");

const vertexSchema = gql`
  extend type Query {
    vertex(id: ID!): Vertex
  }

  extend type Mutation {
    createVertex(
      data: DataInput!
      type: String
      position: CoordinatesInput!
      graphId: ID!
    ): VertexMutationResponse!
    updateVertexData(id: ID!, data: DataInput!): VertexMutationResponse!
    updateVertexPosition(
      id: ID!
      position: CoordinatesInput!
    ): VertexMutationResponse!
    deleteVertex(id: ID!): VertexMutationResponse!
  }

  type Vertex {
    id: ID!
    data: Data!
    type: String!
    position: Coordinates!
    targets: [Vertex!]
    graph: Graph!
  }

  type Data {
    label: String!
  }

  input DataInput {
    label: String!
  }

  type Coordinates {
    x: Int
    y: Int
  }

  input CoordinatesInput {
    x: Int
    y: Int
  }

  type VertexMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    vertex: Vertex
  }
`;

module.exports = vertexSchema;
