const jwt = require("jsonwebtoken");
const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");
const { response } = require("express");

function Response(message = "", code = 200, success = true) {
  this.code = code;
  this.success = success;
  this.message = message;
}

const createToken = async (user, secret, expiresIn) => {
  const { id, email, firstName, lastName } = user;
  console.log(`id: ${id}, email: ${email}`);
  return await jwt.sign({ id, email, firstName, lastName }, secret, {
    expiresIn,
  });
};

const userResolvers = {
  Query: {
    me(root, args, { me }) {
      return me;
    },

    async user(root, { id }, { models }) {
      return models.user.findByPk(id);
    },
  },

  Mutation: {
    async signUp(
      root,
      { firstName, lastName, email, password },
      { models, secret }
    ) {
      const user = await models.user
        .create({
          firstName,
          lastName,
          email,
          password,
        })
        .then((user) => user.get({ plain: true }));

      const res = !user
        ? new Response("New user could not be signed up.", 400, false)
        : new Response("New user signed up.");

      return { ...res, token: { jwt: createToken(user, secret, "1h") } };
    },

    async signIn(root, { login, password }, { models, secret }) {
      const user = await models.user.findByLogin(login);

      const isValid = await user.validatePassword(password);

      if (!user) {
        const res = new Response(
          "No user found with these login credentials.",
          400,
          false
        );
        return { ...res, token: { jwt: "" } };
      } else if (!isValid) {
        const res = new Response("Invalid password.", 400, false);
        return { ...res, token: { jwt: "" } };
      } else {
        const res = new Response("Successful login.");
        const token = await createToken(user, secret, "1h");
        return { ...res, token: { jwt: token } };
      }
    },

    updateEmail: combineResolvers(
      isAuthenticated,
      async (root, { email }, { models, me }) => {
        return models.user
          .findByPk(me.id)
          .then((user) => user.update({ email }));
      }
    ),

    deleteUser: combineResolvers(
      isAuthenticated,
      async (root, { models, me }) => {
        const row = models.user.findByPk(me.id).then((user) => user.destroy());
        return !row.length;
      }
    ),
  },

  User: {
    async graphs(user) {
      return user.getGraphs();
    },
  },
};

module.exports = userResolvers;
