const graphResolvers = {
  Query: {
    async allGraphs(root, args, { models }) {
      return models.graph.findAll();
    },
    async graph(root, { id }, { models }) {
      return models.graph.findByPk(id);
    },
  },

  Mutation: {
    async createGraph(root, { name, userId }, { models }) {
      return models.graph.create({
        name,
        userId,
      });
    },
    async updateGraphName(root, { id, name }, { models }) {
      return models.graph.findByPk(id).then((graph) => graph.update({ name }));
    },
    async deleteGraph(root, { id }, { models }) {
      const row = models.graph.findByPk(id).then((graph) => graph.destroy());
      return !row.length;
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
};

module.exports = graphResolvers;
