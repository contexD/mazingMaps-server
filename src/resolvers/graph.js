const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated, isGraphOwner } = require("./authorization");

const graphResolvers = {
  Query: {
    allGraphs: combineResolvers(
      isAuthenticated,
      async (root, args, { models, me }) => {
        return models.graph.findAll({ where: { userId: me.id } });
      }
    ),

    graph: combineResolvers(
      isAuthenticated,
      isGraphOwner,
      async (root, { id }, { models, me }) => {
        return models.graph.findByPk(id);
      }
    ),
  },

  Mutation: {
    createGraph: combineResolvers(
      isAuthenticated,
      async (root, { name }, { models, me }) => {
        return models.graph.create({
          name,
          userId: me.id,
        });
      }
    ),

    updateGraphName: combineResolvers(
      isAuthenticated,
      isGraphOwner,
      async (root, { id, name }, { models }) => {
        return models.graph
          .findByPk(id)
          .then((graph) => graph.update({ name }));
      }
    ),

    deleteGraph: combineResolvers(
      isAuthenticated,
      isGraphOwner,
      async (root, { id }, { models }) => {
        const row = models.graph.findByPk(id).then((graph) => graph.destroy());
        return !row.length;
      }
    ),
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
