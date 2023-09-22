import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({

  imports: [

    PassportModule,

    ConfigModule.forRoot({}),

    JwtModule.register({

      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }

    })

  ],

  controllers: [
    AuthController
  ],

  providers: [
    AuthService,
  ]

})
export class AuthModule { }
