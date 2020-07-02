const userResolvers = require("./user");
const graphResolvers = require("./graph");
const vertexResolvers = require("./vertex");
const edgeResolvers = require("./edge");

module.exports = [
  userResolvers,
  graphResolvers,
  vertexResolvers,
  edgeResolvers,
];
