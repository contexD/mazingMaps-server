const {
  isAuthenticated,
  isVertexOwner,
  Response,
  formatEdge,
} = require("../utils/");

const edgeResolvers = {
  Mutation: {
    async createEdge(root, { sourceId, targetId }, { models, me }) {
      const checkVertexOwner = await isVertexOwner(null, sourceId, models, me);

      if (!isAuthenticated(me)) {
        const res = new Response(
          "Not logged in. Log in to create new edge.",
          403,
          false
        );
        return { ...res, edge: null };
      } else if (!checkVertexOwner) {
        const res = new Response(
          "This vertex does not belong to your mind-map",
          403,
          false
        );
        return { ...res, edge: null };
      } else {
        const res = new Response("New edge created");
        const id = `e${sourceId}-${targetId}`;
        const newEdge = await models.edges
          .create({
            id,
            sourceId,
            targetId,
          })
          .then((edge) => formatEdge(edge));
        return { ...res, edge: newEdge };
      }
    },

    async deleteEdge(root, { id }, { models, me }) {
      const sourceId = id.match(/e(\d+)/)[1];
      const checkVertexOwner = await isVertexOwner(null, sourceId, models, me);

      if (!isAuthenticated(me)) {
        const res = new Response(
          "Not logged in. Log in to delete edge.",
          403,
          false
        );
        return { ...res, edge: null };
      } else if (!checkVertexOwner) {
        const res = new Response(
          "This vertex does not belong to your mind-map.",
          403,
          false
        );
        return { ...res, edge: null };
      } else {
        const res = new Response("Edge deleted");
        //get the edge to be returned
        const deletedEdge = await models.edges
          .findByPk(id)
          .then((edge) => formatEdge(edge));
        //get edge instance for deletion
        const edge = await models.edges.findByPk(id);
        edge.destroy();
        return { ...res, edge: deletedEdge };
      }
    },
  },
};

module.exports = edgeResolvers;
