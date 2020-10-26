import { prisma } from '../../../../generated/prisma-client';
import { generateSecret } from '../../../utils';

export default {
  Mutation: {
    requestSecret: async (_: undefined | null, args: any) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(loginSecret);
      try {
        await prisma.updateUser({
          data: { loginSecret },
          where: { email }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
