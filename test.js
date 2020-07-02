const models = require("./models");

// const graph = async () => {
//   const result = await models.graph.findByPk(1, {
//     include: [{ model: models.vertex }],
//   });
//   const allSources = await models.vertex.findAll({
//     include: [
//       {
//         model: models.vertex,
//         as: "sources",
//         through: {
//           attributes: ["sourceId", "targetId"],
//         },
//       },
//     ],
//   });

//   const targetsOne = models.vertex
//     .findByPk(1)
//     .then((vertex) => vertex.getTargets())
//     .then((r) =>
//       console.log(
//         "targetsVertexOne",
//         r.map((r) => r.get({ plain: true }))
//   )
// );
//create new edge between simple and intuitve
//   const newTarget = models.vertex
//     .findByPk(2)
//     .then((vertex) => vertex.addTarget(3));

//create new edge between latex and markdown
//   const newEdge = models.edges
//     .create({ sourceId: 4, targetId: 5 })
//     .then((r) => console.log("newEdge", r.get({ plain: true })));

//   const allEdges = models.edges
//     .findAll()
//     .then((r) => console.log(r.map((ele) => ele.get({ plain: true }))));

//test getUser on graph
//   const newTest = models.graph
//     .findByPk(2)
//     .then((r) => r.getUser())
//     .then((r) => console.log("this graph belongs to", r.get({ plain: true })));

// test delete user
//   const deletedUser = await models.user
//     .findByPk(2)
//     .then((user) => user.destroy());
//   console.log("\n deletedUser \n", deletedUser);

//test update graphName
const graph = async () => {
  const updatedGraph = await models.graph
    .findByPk(2, {
      include: [{ model: models.user }, { model: models.vertex }],
    })
    .then((graph) => graph.update({ name: "new name" }));

  //   const graphUser = await updatedGraph
  //     .getUser()
  //     .then((user) => user.get({ plain: true }));

  //   const graphVertices = await updatedGraph
  //     .getVertices()
  //     .then((vertices) => vertices.map((vertex) => vertex.get({ plain: true })));

  //   // construct new graph for (as speciified in schema)
  //   const newGraph = {
  //     ...updatedGraph.get({ plain: true }),
  //     user: graphUser,
  //     vertices: graphVertices,
  //   };

  console.log("\n updatedGraph \n", updatedGraph.get({ plain: true }));
  //   console.log("\n graphUser \n", graphUser);
  //   console.log("\n graphVertices \n", graphVertices);
  //   console.log("\n newGraph \n", newGraph);
};
graph();

/* available methods on vertex 
    - getSources, setSources, addSource, addSources 
    - getTargets, setTargets, addTarget, addTargets */

//create new edge between vertex 4 and 5
//find vertex with id 4
// // };
// graph();
