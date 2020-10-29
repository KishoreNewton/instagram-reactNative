import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_: undefined, args: any) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        const token = generateToken(user.id);
        return token;
      } else {
        throw new Error('Wrong email/secret combination');
      }
    }
  }
};
