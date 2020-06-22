const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated, isVertexOwner } = require("./authorization");

const edgeResolvers = {
  Mutation: {
    createEdge: combineResolvers(
      isAuthenticated,
      isVertexOwner,
      async (root, { sourceId, targetId }, { models }) => {
        return models.edges
          .create({
            sourceId,
            targetId,
          })
          .then((edge) => {
            return { source: edge.getSource(), target: edge.getTarget() };
          });
      }
    ),
    deleteEdge: combineResolvers(
      isAuthenticated,
      isVertexOwner,
      async (root, { sourceId, targetId }, { models }) => {
        const row = models.edges
          .findOne({ where: { sourceId, targetId } })
          .then((edge) => edge.destroy());
        return !row.length;
      }
    ),
  },
};

module.exports = edgeResolvers;
