require("dotenv/config");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const models = require("../models");
const typeDefs = require("./schema/");
const resolvers = require("./resolvers/");

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

const getMe = async (req) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (token) {
    try {
      const data = await jwt.verify(token, process.env.SECRET);
      return data;
    } catch (e) {
      return null;
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
