import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPost: async (_ : any, args: any) => {
      prisma.posts({
        where: {
          OR: [
            {location_contains: args.term },
            { captions_contains: args.term }
          ]
        }
      })
    }
  }
}