import { prisma } from '../../../generated/prisma-client';

export default {
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
    },
    likeCount: (parent: any) => {
      return prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count();
    }
  }
};
