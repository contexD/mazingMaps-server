const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const models = require("../models");

const app = express();
const port = 4000;

app.use(cors());

const typeDefs = require("./schema/");
const resolvers = require("./resolvers/");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    models,
    me: await models.user.findByLogin("test@test.com"),
  }),
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(
    `💥 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
