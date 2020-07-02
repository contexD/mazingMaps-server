const { combineResolvers } = require("graphql-resolvers");
const {
  isAuthenticated: isAuthenticatedResolver,
  isVertexOwner: isVertexOwnerResolver,
} = require("./authorization");
const {
  isAuthenticated,
  isGraphOwner,
  isVertexOwner,
  Response,
} = require("../utils/");

const vertexResolvers = {
  Query: {
    vertex: combineResolvers(
      isAuthenticatedResolver,
      isVertexOwnerResolver,
      async (root, { id }, { models, me }) => {
        return models.vertex.findByPk(id);
      }
    ),
  },

  Mutation: {
    async createVertex(root, { data, x, y, graphId }, { models, me }) {
      const checkIsGraphOwner = await isGraphOwner(null, graphId, models, me);

      if (!isAuthenticated(me)) {
        const res = new Response("Log in to create new vertices", 403, false);
        return { ...res, vertex: null };
      } else if (!checkIsGraphOwner) {
        const res = new Response(
          "You're not the owner of this mind-map.",
          403,
          false
        );
        return { ...res, vertex: null };
      } else {
        const res = new Response("Vertex created.");
        const newVertex = await models.vertex.create({
          data,
          x,
          y,
          graphId,
        });
        return { ...res, vertex: newVertex };
      }
    },

    async updateVertexData(root, { id, data }, { models, me }) {
      const checkIsVertexOwner = await isVertexOwner(id, null, models, me);

      if (!isAuthenticated(me)) {
        const res = new Response("Log in to update vertex.", 403, false);
        return { ...res, vertex: null };
      } else if (!checkIsVertexOwner) {
        const res = new Response(
          "You're not the owner of this vertex",
          403,
          false
        );
        return { ...res, vertex: null };
      } else {
        const res = new Response("Vertex data updated.");
        const updatedVertex = await models.vertex
          .findByPk(id)
          .then((vertex) => vertex.update({ data }));
        return { ...res, vertex: updatedVertex };
      }
    },

    async updateVertexCoordinates(root, { id, x, y }, { models, me }) {
      const checkIsVertexOwner = await isVertexOwner(id, null, models, me);

      if (!isAuthenticated(me)) {
        const res = new Response("Log in to update vertex.", 403, false);
        return { ...res, vertex: null };
      } else if (!checkIsVertexOwner) {
        const res = new Response(
          "You're not the owner of this vertex",
          403,
          false
        );
        return { ...res, vertex: null };
      } else {
        const res = new Response("Vertex coordinates updated.");
        const updatedVertex = await models.vertex
          .findByPk(id)
          .then((vertex) => vertex.update({ x, y }));
        return { ...res, vertex: updatedVertex };
      }
    },

    async deleteVertex(root, { id }, { models, me }) {
      const checkIsVertexOwner = await isVertexOwner(id, null, models, me);

      if (!isAuthenticated(me)) {
        const res = new Response("Log in to delete vertices.", 403, false);
        return { ...res, vertex: null };
      } else if (!checkIsVertexOwner) {
        const res = new Response(
          "You're not the owner of this vertex",
          403,
          false
        );
        return { ...res, vertex: null };
      } else {
        const res = new Response("Vertex deleted.");
        const deletedVertex = await models.vertex.findByPk(id);
        deletedVertex.destroy();
        return { ...res, vertex: deletedVertex };
      }
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

module.exports = vertexResolvers;
