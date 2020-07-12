const jwt = require("jsonwebtoken");

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const createToken = async (user, secret, expiresIn) => {
  const { id, email, firstName, lastName } = user;
  return await jwt.sign({ id, email, firstName, lastName }, secret, {
    expiresIn,
  });
};

const isAuthenticated = (id) => {
  return id ? true : false;
};

const isGraphOwner = async (id, graphId, models, me) => {
  /* determine whether isGraphOwner was invoked 
  in graphResolvers or vertexResolvers and find id */
  const actualId = id || graphId;

  const { id: graphOwnerId } = await models.graph
    .findByPk(actualId)
    .then((graph) => graph.getUser())
    .then((user) => user.get({ plain: true }));

  return graphOwnerId === me.id;
};

const isVertexOwner = async (id, sourceId, models, me) => {
  /* determine whether isVertexOwner was invoked 
  in vertexResolvers or edgeResolvers and find id */
  const actualId = id || sourceId;

  const { id: vertexOwnerId } = await models.vertex
    .findByPk(actualId)
    .then((vertex) => vertex.getGraph())
    .then((graph) => graph.getUser())
    .then((user) => user.get({ plain: true }));

  return vertexOwnerId === me.id;
};

function Response(message = "", code = 200, success = true) {
  this.code = code;
  this.success = success;
  this.message = message;
}

function formatVertex(vertex) {
  vertex.id.toString;
  return vertex;
}

function formatEdge(edge) {
  const { id, animated, sourceId: source, targetId: target } = edge.get({
    plain: true,
  });
  return { id, animated, source, target };
}

module.exports = {
  createToken,
  isAuthenticated,
  isGraphOwner,
  isVertexOwner,
  Response,
  formatVertex,
  formatEdge,
};
