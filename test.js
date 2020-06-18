const models = require("./models");

const graph = async () => {
  const result = await models.graph.findByPk(1, {
    include: [{ model: models.vertex }],
  });
  const allSources = await models.vertex.findAll({
    include: [
      {
        model: models.vertex,
        as: "sources",
        through: {
          attributes: ["sourceId", "targetId"],
        },
      },
    ],
  });

  const targetsOne = models.vertex
  .findByPk(1)
  .then((vertex) => vertex.getTargets())
  .then((r) =>
    console.log(
      "targetsVertexOne",
      r.map((r) => r.get({ plain: true }))
    )
  );
  //create new edge between simple and intuitve

 

  //create new edge between vertex 4 and 5
  //find vertex with id 4

  console.log("exampleGraph", result.get({ plain: true }));
  console.log(
    "allSources",
    allSources.map((source) => source.get({ plain: true }))
  );
  //console.log("vertexOne", vertexOne.get({ plain: true }));
};
graph();
