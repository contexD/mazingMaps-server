const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    me: (root, args, { me }) => {
      return me;
    },
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
    /* resolvers for "single queries" */
    async user(root, { id }, { models }) {
      return models.user.findByPk(id);
    },
    async graph(root, { id }, { models }) {
      return models.graph.findByPk(id);
    },
    async vertex(root, { id }, { models }) {
      return models.vertex.findByPk(id);
    },
  },
  /* resolvers for CRUD functionality */
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
    async updateEmail(root, { id, email }, { models }) {
      return models.user.findByPk(id).then((user) => user.update({ email }));
    },
    async deleteUser(root, { id }, { models }) {
      return models.user.findByPk(id).then((user) => user.destroy());
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
    async addTarget(root, { vertexId, targetId }, { models }) {
      return models.edges
        .create({
          sourceId: vertexId,
          targetId,
        })
        .then((edge) => edge.getSource());
    },
  },
  User: {
    async graphs(user) {
      return user.getGraphs();
    },
  },
  Graph: {
    async user(graph) {
      return graph.getUser();
    },
    async vertices(graph) {
      return graph.getVertices();
    },
  },
  Vertex: {
    async targets(vertex) {
      return vertex.getTargets();
    },
    async graph(vertex) {
      return vertex.getGraph();
    },
  },
};

module.exports = resolvers;
