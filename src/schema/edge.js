const { gql } = require("apollo-server-express");

const edgeSchema = gql`
  type Edge {
    source: Vertex!
    target: Vertex!
  }
`;

module.exports = edgeSchema;
