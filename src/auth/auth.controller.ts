import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto, @Res() res: Response){
        return this.authService.login(loginDto, res)
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logout(@Res() res: Response){
        return this.authService.logout(res)
    }

}
