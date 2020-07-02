const jwt = require("jsonwebtoken");

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
  const actualId = id ? id : graphId;

  const { id: graphOwnerId } = await models.graph
    .findByPk(actualId)
    .then((graph) => graph.getUser())
    .then((user) => user.get({ plain: true }));

  return graphOwnerId !== me.id;
};

const isVertexOwner = async (id, sourceId, models, me) => {
  /* determine whether isVertexOwner was invoked 
  in vertexResolvers or edgeResolvers and find id */

  const actualId = id ? id : sourceId;
  const { id: vertexOwnerId } = await models.vertex
    .findByPk(actualId)
    .then((vertex) => vertex.getGraph())
    .then((graph) => graph.getUser())
    .then((user) => user.get({ plain: true }));

  return vertexOwnerId !== me.id;
};

function Response(message = "", code = 200, success = true) {
  this.code = code;
  this.success = success;
  this.message = message;
}

module.exports = {
  createToken,
  isAuthenticated,
  isGraphOwner,
  isVertexOwner,
  Response,
};
