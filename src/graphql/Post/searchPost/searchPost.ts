import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPost: async (_ : any, args: any) => {
      prisma.posts({
        where: {
          OR: [
            {location_contains: args.term },
            { caption_contains: args.term }
          ]
        }
      })
    }
  }
}