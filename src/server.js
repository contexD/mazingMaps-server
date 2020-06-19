const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const models = require("../models");

const app = express();
const port = 4000;

app.use(cors());

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

//hard-coded user
const me = {
  id: 1,
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, me },
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
