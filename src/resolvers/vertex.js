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
  formatVertex,
} = require("../utils/");

const vertexResolvers = {
  Query: {
    vertex: combineResolvers(
      isAuthenticatedResolver,
      isVertexOwnerResolver,
      async (root, { id }, { models, me }) => {
        return models.vertex
          .findByPk(id)
          .then((vertex) => formatVertex(vertex));
      }
    ),
  },

  Mutation: {
    async createVertex(
      root,
      { data, type, position, graphId },
      { models, me }
    ) {
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
        const newVertex = await models.vertex
          .create({
            data,
            type,
            position,
            graphId,
          })
          .then((newVertex) => formatVertex(newVertex));
        return {
          ...res,
          vertex: newVertex,
        };
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
        let updatedVertex = await models.vertex
          .findByPk(id)
          .then((vertex) => vertex.update({ data }))
          .then((updatedVertex) => formatVertex(updatedVertex));
        return { ...res, vertex: updatedVertex };
      }
    },

    async updateVertexPosition(root, { id, position }, { models, me }) {
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
        const res = new Response("Vertex position updated.");
        let updatedVertex = await models.vertex
          .findByPk(id)
          .then((vertex) => vertex.update({ position }))
          .then((updatedVertex) => formatVertex(updatedVertex));
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
        deletedVertex.id.toString();
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
