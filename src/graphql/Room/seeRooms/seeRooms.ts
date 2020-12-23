import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeRooms: (
      _: undefined,
      __: undefined,
      { req, isAuthenticated }: { req: any; isAuthenticated: any }
    ) => {
      isAuthenticated(req);
      const { user } = req;
      return prisma.rooms({
        where: {
          participants_some: {
            id: user.id
          }
        }
      });
    }
  }
};
