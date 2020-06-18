const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
    allGraphs: [Graph!]!
    allVertices: [Vertex!]!
    allEdges: [Edge!]!
    user(id: Int!): User
    graph(id: Int!): Graph
    vertex(id: Int!): Vertex
    edge(id: Int!): Edge
  }

  type Mutation {
    createUser(
      id: Int!
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): User!
    createGraph(id: Int!, name: String!, userId: Int!): Graph!
    createVertex(id: Int!, data: String!, graphId: Int!): Vertex!
    createEdge(id: Int!, source: Int!, target: Int!): Edge!
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
  }

  type Graph {
    id: Int!
    name: String!
    user: User!
  }

  type Vertex {
    id: Int!
    data: String!
    graph: Graph!
  }

  type Edge {
    id: Int!
    source: Vertex!
    target: Vertex!
  }
`;

module.exports = typeDefs;
