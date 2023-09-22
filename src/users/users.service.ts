import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService) { }


    async getUserById(userId: string, req: Request): Promise<User> {

        const user = await this.prisma.user.findFirst({ where: { id: userId } })

        if (userId !== user?.id) {
            throw new NotFoundException()
        }

        const decodeUser = req.user as { userId: string, email: string }

        if (user.id !== decodeUser.userId) {
            throw new ForbiddenException()
        }

        delete user.hash

        return user
    }

    async getAllUsers(): Promise<User[]> {

        const users = await this.prisma.user.findMany()

        users.map(user => delete user.hash)

        return users

    }

}
