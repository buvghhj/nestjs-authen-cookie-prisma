import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {

        return this.authService.register(registerDto)

    }

    @Post('login')
    login(@Body() loginDto: LoginDto, @Req() req, @Res() res) {

        return this.authService.login(loginDto, req, res)

    }

    @Get('logout')
    logout(@Req() req, @Res() res) {

        return this.authService.logout(req, res)

    }


}
