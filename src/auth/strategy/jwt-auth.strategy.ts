import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor(configService: ConfigService) {

        super({

            jwtFromRequest: ExtractJwt.fromExtractors([JwtAuthStrategy.extractJwt,]),

            secretOrKey: configService.get('JWT_SECRET'),

        })

    }

    private static extractJwt(req: Request): string | null {

        if (req.cookies && 'access_token' in req.cookies) {

            return req.cookies.access_token

        }

        return null

    }

    async validate(payload: any) {

        return { userId: payload.userId, email: payload.email }

    }

}