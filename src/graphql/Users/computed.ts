import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: (parent: any) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    amIFollowing: async (
      parent: any,
      _: undefined,
      { req }: { req: any }
    ) => {
      const { user } = req;
      const { id: parentId } = parent;
      try {
        const exists = await prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: { id: user.id } }]
        });
        if (exists) {
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    itsMe: (parent: any, _: undefined, { req }: { req: any }) => {
      const { user } = req;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
