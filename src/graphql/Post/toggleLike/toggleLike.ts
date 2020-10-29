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
      console.log(req.user);
      isAuthenticated(req);
      const { postId } = args;
      const { user }: any = req;
      const existingLike = await prisma.$exists.like({
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
      });
      if (existingLike) {
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
    }
  }
};
