const { combineResolvers } = require("graphql-resolvers");
const {
  isAuthenticated: isAuthenticatedResolver,
  isGraphOwner: isGraphOwnerResolver,
} = require("./authorization");
const { isAuthenticated, isGraphOwner, Response } = require("../utils/");

const graphResolvers = {
  Query: {
    allGraphs: combineResolvers(
      isAuthenticatedResolver,
      async (root, args, { models, me }) => {
        return models.graph.findAll({ where: { userId: me.id } });
      }
    ),

    graph: combineResolvers(
      isAuthenticatedResolver,
      isGraphOwnerResolver,
      async (root, { id }, { models, me }) => {
        return models.graph.findByPk(id);
      }
    ),
  },

  Mutation: {
    async createGraph(root, { name }, { models, me }) {
      if (isAuthenticated(me)) {
        const res = new Response("Mind map created");
        const newGraph = await models.graph
          .create({
            name,
            userId: me.id,
          })
          .then((graph) => graph.get({ plain: true }));
        return { ...res, graph: newGraph };
      } else {
        const res = new Response("Mind map could not be created", 500, false);
        return { ...res, graph: null };
      }
    },

    async updateGraphName(root, { id, name }, { models, me }) {
      const checkGraphOwner = await isGraphOwner(id, null, models, me);

      if (!checkGraphOwner) {
        const res = new Response("You're not the mind map owner", 403, false);
        return { ...res, graph: null };
      } else if (!isAuthenticated(me)) {
        const res = new Response("Log in to rename your mind maps", 403, false);
        return { ...res, graph: null };
      } else {
        const res = new Response("Mind map's name updated");
        const updatedGraph = await models.graph
          .findByPk(id)
          .then((graph) => graph.update({ name }))
          .then((graph) => graph.get({ plain: true }));
        return { ...res, graph: updatedGraph };
      }
    },

    async deleteGraph(root, { id }, { models, me }) {
      const checkGraphOwner = await isGraphOwner(id, null, models, me);

      if (!checkGraphOwner) {
        const res = new Response("You're not the mind map's owner", 403, false);
        return { ...res, graph: null };
      } else if (!isAuthenticated(me)) {
        const res = new Response("Log in to delete your mind map", 403, false);
        return { ...res, graph: null };
      } else {
        const res = new Response("Mind map deleted");
        const deletedGraph = await models.graph.findByPk(id);
        const row = deletedGraph.destroy();
        return { ...res, graph: deletedGraph };
      }
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
