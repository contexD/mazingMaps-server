const { isAuthenticated, isVertexOwner, Response } = require("../utils/");

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
          .then((edge) => {
            const { id, animated } = edge.get({ plain: true });
            return {
              id,
              source: edge.getSource(),
              target: edge.getTarget(),
              animated,
            };
          });
        return { ...res, edge: newEdge };
      }
    },

    async deleteEdge(root, { id }, { models, me }) {
      const checkVertexOwner = await isVertexOwner(
        null,
        id.split("")[1],
        models,
        me
      );

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
        const deletedEdge = await models.edges.findByPk(id).then((edge) => {
          const { id, animated } = edge.get({ plain: true });
          return {
            id,
            source: edge.getSource(),
            target: edge.getTarget(),
            animated,
          };
        });
        //get edge instance for deletion
        const edge = await models.edges.findByPk(id);
        edge.destroy();
        return { ...res, edge: deletedEdge };
      }
    },
  },
};

module.exports = edgeResolvers;
