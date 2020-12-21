import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: (
      _: undefined | null,
      args: any,
      { req }: { req: any }
    ) => {
        const { id } = args;
        return prisma.user({ id });
    }
  }
};
