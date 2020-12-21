import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    me: (
      _: any,
      __: any,
      { req, isAuthenticated }: { req: any; isAuthenticated: any }
    ) => {
      isAuthenticated(req);
      const { user } = req;
      return prisma.user({ id: user.id }).$fragment(``) ;
    }
  }
};
