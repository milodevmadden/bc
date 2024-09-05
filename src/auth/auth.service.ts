import { Injectable, NotFoundException, UnauthorizedException, Res } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminsService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    const { email, pass } = loginDto;

    try {
          const {ok, admin} = await this.adminService.findOne(email);

          if (!admin) throw new NotFoundException('User not found');

          const isMatch = await bcrypt.compare(pass, admin.password);

          if (!isMatch) throw new UnauthorizedException('Incorrect password');

          const payload = { id: admin._id, name: admin.username, email: admin.email };
          const accessToken = await this.jwtService.signAsync(payload);

          res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // True if in production
            sameSite: 'strict',
          });

          res.status(200).send({
            ok: true,
            message: 'Login successful',
          });
    } catch (error) {
      return res.status(401).json({ ok: false, message: error.message })
    }


  }

  logout(res: Response) {
    res.clearCookie('access_token');
    res.status(200).send({
      ok: true,
      message: 'Logout successful',
    });
  }
}
