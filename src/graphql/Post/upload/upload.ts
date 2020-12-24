import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    upload: async (
      _: undefined,
      args: any,
      { req, isAuthenticated }: { req: any; isAuthenticated: any }
    ) => {
      isAuthenticated(req);
      const { user } = req;
      const { caption, files } = args;
      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } }
      });
      files.forEach(async (file: any) => {
        await prisma.createFile({
          url: file,
          post: {
            connect: {
              id: post.id
            }
          }
        });
      });
      return post;
    }
  }
};
