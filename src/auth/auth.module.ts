import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminsModule } from 'src/admins/admins.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    AdminsModule,
    JwtModule.register({
      global: true, 
      secret: envs.jwtSecret,
      signOptions: {
        expiresIn: '30d'
      }
    })
  ]
})
export class AuthModule {}
