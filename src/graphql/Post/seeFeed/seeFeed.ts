import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFeed: async (
      _: undefined,
      __: undefined,
      { req, isAuthenticated }: { req: any; isAuthenticated: any }
    ) => {
      isAuthenticated(req);
      const { user } = req;
      const following = await prisma
        .user({ id: user.id })
        .following();
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
