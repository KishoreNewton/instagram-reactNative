import { isAuthenticated } from '../../../middlewares';
import { Request } from 'express';
import { prisma, User } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    toggleLike: async (
      _: undefined,
      args: any,
      { req }: { req: Request }
    ): Promise<any> => {
      isAuthenticated(req);
      const { postId } = args;
      const { user }: any = req;
      try {
        const filterOptions = {
          AND: [
            {
              user: {
                id: user.id
              }
            },
            {
              post: {
                id: postId
              }
            }
          ]
        };
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          await prisma.deleteManyLikes(filterOptions);
        } else {
          const newLike = await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
