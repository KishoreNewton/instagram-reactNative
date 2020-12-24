import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editUser: async (
      _: undefined | null,
      args: any,
      { req, isAuthenticated }: { req: any; isAuthenticated: any }
    ) => {
      isAuthenticated(req);
      const { username, email, firstName, lastName, bio, avatar } = args;
      const { user } = req;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio, avatar }
      });
    }
  }
};
