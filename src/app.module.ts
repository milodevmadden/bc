import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { AdminsModule } from './admins/admins.module';
import { MembersModule } from './members/members.module';
import { LoadsModule } from './loads/loads.module';

@Module({
  imports: [
    AuthModule, 
    MongooseModule.forRoot(envs.mongoUrl),
    AdminsModule,
    MembersModule,
    LoadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
