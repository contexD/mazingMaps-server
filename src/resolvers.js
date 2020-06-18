const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    /* resolvers for "all" queries */
    async allUsers(root, args, { models }) {
      return models.user.findAll();
    },
    async allGraphs(root, args, { models }) {
      return models.graph.findAll();
    },
    async allVertices(root, args, { models }) {
      return models.vertex.findAll();
    },
    async allEdges(root, args, { models }) {
      return models.edge.findAll();
    },
    /* resolvers for "single" queries */
    async user(root, { id }, { models }) {
      return models.user.findById(id);
    },
    async graph(root, { id }, { models }) {
      return models.graph.findById(id);
    },
    async vertex(root, { id }, { models }) {
      return models.vertex.findById(id);
    },
    async edge(root, { id }, { models }) {
      return models.edge.findById(id);
    },
  },
  Mutation: {
    async createUser(
      root,
      { firstName, lastName, email, password },
      { models }
    ) {
      return models.user.create({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
      });
    },
    async createGraph(root, { name, userId }, { models }) {
      return models.graph.create({
        name,
        userId,
      });
    },
    async createVertex(root, { data, graphId }, { models }) {
      return models.vertex.create({
        data,
        graphId,
      });
    },
    async createEdge(root, { source, target }, { models }) {
      return models.edge.create({
        source,
        target,
      });
    },
  },
  Graph: {
    async user(graph) {
      return graph.getUser();
    },
  },
  Vertex: {
    async graph(vertex) {
      return vertex.getGraph();
    },
  },
  Edge: {
    async source(vertex) {
      return vertex.getSource();
    },
    async target(vertex) {
      return vertex.getTarget();
    },
  },
};

module.exports = resolvers;
