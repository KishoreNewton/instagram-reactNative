import { prisma } from '../../../../generated/prisma-client';
import { COMMENT_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    seeFullPost: async (_: undefined | null, args: any) => {
      const { id } = args;
      const post = await prisma.post({ id });
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      const files = await prisma.post({ id }).files();
      return {
        post,
        comments,
        files
      };
    }
  }
};
