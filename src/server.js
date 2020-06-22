const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const models = require("../models");

const app = express();
const port = 4000;
app.use(cors());

const typeDefs = require("./schema/");
const resolvers = require("./resolvers/");

const getMe = async (req) => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session has expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(
    `💥 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
