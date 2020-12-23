import { prisma } from '../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../fragments';

export default {
  Mutation: {
    sendMessage: async (
      _: undefined,
      args: any,
      { req, isAuthenticated }: { req: any; isAuthenticated: any }
    ) => {
      isAuthenticated(req);
      const { user } = req;
      const { roomId, message, toId } = args;
      let room;

      if (roomId === undefined) {
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              connect: [
                {
                  id: toId
                },
                {
                  id: user.id
                }
              ]
            }
          }).$fragment(ROOM_FRAGMENT);
        } else {
          throw new Error("Something went wrong"); 
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }

      if (!room) {
        console.log(room)
        throw new Error('Room Not Found');
      } 

      // @ts-ignore
      const getTo = room.participants.filter(participant  => participant.id !== user.id[0])

      return prisma.createMessage({
          text: message,
          from: {
              connect: { id: user.id }
          },
          to: {
              connect: {
                  id: roomId ? getTo.id : toId
              }
          },
          room: {
            connect: {
              // @ts-ignore
              id: room.id
            }
          }
      })
    }
  }
};
