const { gql } = require("apollo-server-express");

const responseSchema = gql`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;

module.exports = responseSchema;
