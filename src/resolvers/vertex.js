const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated, isVertexOwner, isGraphOwner } = require("./authorization");

const vertexResolvers = {
  Query: {
    vertex: combineResolvers(
      isAuthenticated,
      isVertexOwner,
      async (root, { id }, { models, me }) => {
        return models.vertex.findByPk(id);
      }
    ),
  },

  Mutation: {
    createVertex: combineResolvers(
      isAuthenticated,
      isGraphOwner,
      async (root, { data, graphId }, { models }) => {
        return models.vertex.create({
          data,
          graphId
        });
      }
    ),

    updateVertexData: combineResolvers(
      isAuthenticated,
      isVertexOwner,
      async (root, { id, data }, { models }) => {
        return models.vertex
          .findByPk(id)
          .then((vertex) => vertex.update({ data }));
      }
    ),

    deleteVertex: combineResolvers(
      isAuthenticated,
      isVertexOwner,
      async (root, { id }, { models }) => {
        const row = models.vertex
          .findByPk(id)
          .then((vertex) => vertex.destroy());
        return !row.length;
      }
    ),
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

module.exports = vertexResolvers;
