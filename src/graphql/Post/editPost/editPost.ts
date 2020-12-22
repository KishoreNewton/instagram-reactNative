import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editPost: async (
      _: undefined,
      args: any,
      { req, isAuthenticated }: { req: any; isAuthenticated: any }
    ) => {
      isAuthenticated(req);
      const { id, caption, location } = args;
      const { user } = req;
      const post = await prisma.$exists.post({
        id,
        user: { id: user.id }
      });
      if (post) {
        return prisma.updatePost({
          data: { caption, location },
          where: { id }
        });
      } else {
        throw Error(`You can't edit this post`);
      }
    }
  }
};
