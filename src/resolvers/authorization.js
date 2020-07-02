const { skip } = require("graphql-resolvers");

function Response(message = "", code = 200, success = true) {
  this.code = code;
  this.success = success;
  this.message = message;
}

const isAuthenticated = (root, args, { me }) =>
  me ? skip : new Response("Not authenticated as user.", 403, false);

const isGraphOwner = async (root, { id, graphId }, { models, me }) => {
  /* determine whether isGraphOwner was invoked 
  in graphResolvers or vertexResolvers and find id */
  const actualId = id || graphId;

  const { id: graphOwnerId } = await models.graph
    .findByPk(actualId)
    .then((graph) => graph.getUser())
    .then((user) => user.get({ plain: true }));

  if (graphOwnerId !== me.id) {
    new Response("You're not the owner of this graph.", 403, false);
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
    new Response("You're not the owner of this vertex.", 403, false);
  }
  return skip;
};

module.exports = { isAuthenticated, isGraphOwner, isVertexOwner };
