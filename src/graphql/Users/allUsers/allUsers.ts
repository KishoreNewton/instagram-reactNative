import { prisma } from "../../../../generated/prisma-client"

export default {
    Query: {
        allUsers: async() => {
            return await prisma.users()
        }
    }
}