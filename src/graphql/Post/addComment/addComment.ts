import { prisma } from '../../../../generated/prisma-client';
import { isAuthenticated } from '../../../middlewares';
import userById from '../../Users/userById/userById';

export default {
  Mutation: {
    addComment: async (
      _: undefined,
      args: any,
      { req }: { req: any }
    ) => {
      isAuthenticated(req);
      const { text, postId } = args;
      const { user } = req;
      const comment = await prisma.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: {
            id: postId
          }
        },
        text
      });
      return comment;
    }
  }
};
