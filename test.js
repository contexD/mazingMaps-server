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
  const newTarget = models.vertex
    .findByPk(2)
    .then((vertex) => vertex.addTarget(3));

  //create new edge between latex and markdown
  const newEdge = models.edges
    .create({ sourceId: 4, targetId: 5 })
    .then((r) => console.log("newEdge", r.get({ plain: true })));

  const allEdges = models.edges
    .findAll()
    .then((r) => console.log(r.map((ele) => ele.get({ plain: true }))));

 //test getUser on graph
 const newTest = models.graph.findByPk(2).then(r => r.getUser()).then(r => console.log("this graph belongs to", r.get({plain: true})));

  /* available methods on vertex 
    - getSources, setSources, addSource, addSources 
    - getTargets, setTargets, addTarget, addTargets */

  //create new edge between vertex 4 and 5
  //find vertex with id 4
};
graph();
