const userResolvers = {
  Query: {
    me: (root, args, { me }) => {
      return me;
    },
    async user(root, { id }, { models }) {
      return models.user.findByPk(id);
    },
  },

  Mutation: {
    async signUp(root, { firstName, lastName, email, password }, { models }) {
      const user = models.user.create({
        firstName,
        lastName,
        email,
        password,
      });

      return { token: createToken(user) };
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
