const { isAuthenticated, Response, createToken } = require("../utils/");

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

    async updateEmail(root, { email }, { models, me }) {
      if (!isAuthenticated(me)) {
        const res = new Response(
          "Not logged in. To change your email, log in.",
          403,
          false
        );
        return { ...res, user: null };
      } else {
        const res = new Response("Email updated.");
        const updatedUser = await models.user
          .findByPk(me.id)
          .then((user) => user.update({ email }));
        return { ...res, user: updatedUser };
      }
    },

    async deleteUser(root, _, { models, me }) {
      if (!isAuthenticated(me)) {
        const res = new Response(
          "Not logged in. To delete your account, please sign in",
          403,
          false
        );
        return { ...res, user: null };
      } else {
        const deletedUser = await models.user.findByPk(me.id);
        const row = deletedUser.destroy();
        if (!row.length) {
          const res = new Response("User deleted");
          return { ...res, user: deletedUser };
        } else {
          const res = new Response("User could not be deleted", 500, false);
          return { ...res, user: null };
        }
      }
    },
  },

  User: {
    async graphs(user) {
      return user.getGraphs();
    },
  },
};

module.exports = userResolvers;
