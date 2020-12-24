import { prisma } from '../../../../generated/prisma-client';

export default {
  Subscription: {
    newMessage: {
      subscribe: (_: undefined, args: any) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: 'CREATED' },
              {
                node: {
                  room: { id: roomId }
                }
              }
            ]
          })
          .node();
      },
      resolve: (payload: any, args: any, context: any) => {
        console.log(args, context);
        return payload;
      }
    }
  }
};
