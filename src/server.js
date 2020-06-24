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
  const token = req.headers["authorization"].split(" ")[1];

  console.log("token", token);

  if (token) {
    try {
      const data = await jwt.verify(token, process.env.SECRET);
      console.log("data", data);
      return data;
    } catch (e) {
      console.log("e, are you nothin?", e);
      return null;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);

    console.log("me", me);

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
