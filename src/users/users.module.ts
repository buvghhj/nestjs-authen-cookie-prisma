import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthStrategy } from '../auth/strategy/jwt-auth.strategy';

@Module({

  controllers: [
    UsersController
  ],

  providers: [
    UsersService,
    JwtAuthStrategy
  ]

})
export class UsersModule { }
