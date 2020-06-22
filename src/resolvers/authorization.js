const { ForbiddenError } = require("apollo-server-express");
const { skip } = require("graphql-resolvers");

const isAuthenticated = (root, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

const isGraphOwner = async (root, { id, graphId }, { models, me }) => {
  /* determine whether isGraphOwner was invoked 
  in graphResolvers or vertexResolvers and find id */
  //console.log(`id: ${id} \n graphId: ${graphId}`);
  const actualId = id ? id : graphId;

  const { id: graphOwnerId } = await models.graph
    .findByPk(actualId)
    .then((graph) => graph.getUser())
    .then((user) => user.get({ plain: true }));

  if (graphOwnerId !== me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }
  return skip;
};

const isVertexOwner = async (root, { id, sourceId }, { models, me }) => {
  /* determine whether isVertexOwner was invoked 
  in vertexResolvers or edgeResolvers and find id */
  const actualId = id ? id : sourceId;
  const { id: vertexOwnerId } = await models.vertex
    .findByPk(actualId)
    .then((vertex) => vertex.getGraph())
    .then((graph) => graph.getUser())
    .then((user) => user.get({ plain: true }));

  if (vertexOwnerId !== me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }
  return skip;
};

module.exports = { isAuthenticated, isGraphOwner, isVertexOwner };
