const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
    allUsers: [User!]
    allGraphs: [Graph!]
    allVertices: [Vertex!]
    user(id: ID!): User
    graph(id: ID!): Graph
    vertex(id: ID!): Vertex
  }

  type Mutation {
    createUser(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): User!
    updateEmail(id: ID!, email: String!): User!
    deleteUser(id: ID!): Boolean!
    createGraph(name: String!, userId: ID!): Graph!
    updateGraphName(id: ID!, name: String!): Graph!
    deleteGraph(id: ID!): Graph!
    createVertex(data: String!, graphId: ID!): Vertex!
    updateVertexData(id: ID!, data: String!): Vertex!
    deleteVertex(id: ID!): Vertex!
    addTarget(vertexId: ID!, targetId: ID!): Vertex!
    removeTarget(vertexId: ID!, targetId: ID!): Vertex!
  }

  type User {
    id: Int!
    email: String!
    firstName: String!
    lastName: String!
    graphs: [Graph!]!
  }

  type Graph {
    id: Int!
    name: String!
    user: User!
    vertices: [Vertex!]!
  }

  type Vertex {
    id: Int!
    data: String!
    targets: [Vertex!]!
    graph: Graph!
  }

  type Edge {
    source: Vertex!
    target: Vertex!
  }
`;

module.exports = typeDefs;
