import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {

    constructor(private readonly userSerivce: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserById(@Param('id') userId: string, @Req() req: Request) {

        console.log(req.user)

        return this.userSerivce.getUserById(userId, req)

    }

    @Get()
    getAllUsers() {

        return this.userSerivce.getAllUsers()

    }

}
