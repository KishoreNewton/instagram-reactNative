import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    userById: async (_: null, args: any) => {
      const { id } = args;
      return await prisma.user({ id });
    }
  }
};
