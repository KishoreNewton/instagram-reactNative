import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    me: async (
      _: any,
      __: any,
      { req, isAuthenticated }: { req: any; isAuthenticated: any }
    ) => {
      isAuthenticated(req);
      const { user } = req;
      console.log('working')
      return await prisma.user({ id: user.id });
    }
  }
};
