const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const models = require("../models");

const app = express();
const port = 4000;

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers, context: { models } });

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
