import { isAuthenticated } from '../../../middlewares';
import { Request } from 'express';

export default {
  Mutation: {
    toggleLike: async (
      _: undefined,
      args: any,
      { req }: { req: Request }
    ): Promise<any> => {
      isAuthenticated(req);
      const { postId } = args;
      const { user } = req;
      return true;
    }
  }
};
