import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretMail } from '../../../utils';

export default {
  Mutation: {
    requestSecret: async (
      _: undefined | null,
      args: any,
      { req }: { req: any }
    ) => {
      console.log(req.user);
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(loginSecret);
      try {
        throw new Error('somethig went wrong');
        await sendSecretMail(email, loginSecret);
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
