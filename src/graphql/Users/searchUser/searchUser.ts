import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchUser: async (_: undefined, args: any) =>
      prisma.users({
        where: {
          OR: [
            { username_contains: args.term },
            { firstName_contains: args.term },
            { lastName_contains: args.term }
          ]
        }
      })
  }
};
