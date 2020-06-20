const vertexResolvers = {
  Query: {
    async allVertices(root, args, { models }) {
      return models.vertex.findAll();
    },
    async vertex(root, { id }, { models }) {
      return models.vertex.findByPk(id);
    },
  },

  Mutation: {
    async createVertex(root, { data, graphId }, { models }) {
      return models.vertex.create({
        data,
        graphId,
      });
    },
    async updateVertexData(root, { id, data }, { models }) {
      const updatedVertex = await models.vertex
        .findByPk(id)
        .then((graph) => graph.update({ data }));

      console.log("\n updatedVertex \n", updatedVertex);

      return updatedVertex;
    },
    async deleteVertex(root, { id }, { models }) {
      const row = models.vertex.findByPk(id).then((vertex) => vertex.destroy());
      return !row.length;
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
