import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (
      _: undefined,
      args: any,
      { req }: { req: any }
    ) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            loginSecret: ''
          }
        });
        const token = generateToken(user.id);
        return token;
      } else {
        throw new Error('Wrong email/secret combination');
      }
    }
  }
};
