const jwt = require("jsonwebtoken");
const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");

const createToken = async (user, secret, expiresIn) => {
  const { id, email } = user;
  return await jwt.sign({ id, email }, secret, { expiresIn });
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
      const user = models.user.create({
        firstName,
        lastName,
        email,
        password,
      });

      return { token: createToken(user, secret, "1h") };
    },

    async signIn(root, { login, password }, { models, secret }) {
      const user = await models.user.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with these login credentials.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return { token: createToken(user, secret, "1h") };
    },

    async updateEmail(root, { id, email }, { models }) {
      return models.user.findByPk(id).then((user) => user.update({ email }));
    },

    async deleteUser(root, { id }, { models }) {
      const row = models.user.findByPk(id).then((user) => user.destroy());
      return !row.length;
    },
  },

  User: {
    async graphs(user) {
      return user.getGraphs();
    },
  },
};

module.exports = userResolvers;
