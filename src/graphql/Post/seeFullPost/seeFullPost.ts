import { prisma } from '../../../../generated/prisma-client';
import { FULL_POST_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    seeFullPost: (_: undefined | null, args: any) => {
      const { id } = args;
      return prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
    }
  }
};
