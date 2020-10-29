import { prisma } from '../../../../generated/prisma-client';
import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    unfollow: async (
      _: undefined,
      args: any,
      { req }: { req: any }
    ): Promise<any> => {
      isAuthenticated(req);
      const { id } = args;
      const { user } = req;
      try {
        await prisma.updateUser({
          where: {
            id: user.id
          },
          data: {
            following: {
              disconnect: {
                id
              }
            }
          }
        });
        return true
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
