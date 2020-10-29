import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPost: async (_: undefined, args: any): Promise<any> =>
      prisma.posts({
        where: {
          OR: [
            { location_contains: args.term },
            { captions_contains: args.term }
          ]
        }
      })
  }
};
