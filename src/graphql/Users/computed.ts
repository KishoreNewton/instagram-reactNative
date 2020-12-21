import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: (parent: any) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (
      parent: any,
      _: undefined,
      { req }: { req: any }
    ) => {
      const { user } = req;
      const { id: parentId } = parent;
      try {
        const exists = await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        });
        return exists;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    isSelf: (parent: any, _: undefined, { req }: { req: any }) => {
      const { user } = req;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  },
  Post: {
    isLiked: async (
      parent: any,
      _: undefined,
      { req }: { req: any }
    ) => {
      const { user } = req;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    }
  }
};
