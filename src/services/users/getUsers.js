import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: username
            },
            email: {
                contains: email
            }
        }
    })

    return users.map(user => {
        const { password, ...rest } = user;
        return rest;
    })
};

export default getUsers;
