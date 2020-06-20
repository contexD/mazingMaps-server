const edgeResolvers = {
  Query: {},

  Mutation: {
    async createEdge(root, { sourceId, targetId }, { models }) {
      return models.edges
        .create({
          sourceId,
          targetId,
        })
        .then((edge) => {
          return { source: edge.getSource(), target: edge.getTarget() };
        });
    },
    async deleteEdge(root, { sourceId, targetId }, { models }) {
      const row = models.edges
        .findOne({ where: { sourceId, targetId } })
        .then((edge) => edge.destroy());
      return !row.length;
    },
  },
};

module.exports = edgeResolvers;
