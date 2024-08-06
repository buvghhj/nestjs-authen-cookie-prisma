import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }


    async register(registerDto: RegisterDto) {

        const user = await this.prisma.user.findUnique({ where: { email: registerDto.email } })

        if (user) {

            throw new ConflictException('Email already exist')

        }

        const hashPassword = await bcrypt.hash(registerDto.hash, 10)

        const newUser = await this.prisma.user.create({ data: { ...registerDto, hash: hashPassword } })

        const { hash, ...others } = newUser

        return others

    }

    async login(loginDto: LoginDto, req: Request, res: Response) {

        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } })

        if (!user) {

            throw new UnauthorizedException('Email has been wrong')

        }

        const comparePassword = await bcrypt.compare(loginDto.hash, user.hash)

        if (!comparePassword) {

            throw new UnauthorizedException('Password has been wrong')

        }

        const token = this.jwtService.sign({ userId: user.id, email: user.email })

        if (!token) {

            throw new ForbiddenException()

        }

        res.cookie('access_token', token)

        return res.json({ message: "Logged in successfully" })

    }

    async logout(req: Request, res: Response) {

        res.clearCookie('access_token')

        return res.json({ message: "Logout in successfully" })

    }

}
