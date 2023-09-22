import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'

@Module({

  imports: [

    ConfigModule.forRoot({

      isGlobal: true,
      envFilePath: '.env'

    }),

    AuthModule,

    UsersModule,

    PrismaModule

  ],

})
export class AppModule { }
