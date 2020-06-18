const models = require("./models");

const graph = async () => {
  const result = await models.graph.findByPk(1, {
    include: [{ model: models.vertex, include: [models.edge] }],
  });
  const resultEdge = await models.edge.findByPk(1);
  //console.log("exampleGraph", result.get({ plain: true }));
  console.log("exampleEdge", resultEdge.get({ plain: true }));
};
graph();
