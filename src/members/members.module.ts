import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './entities/member.entity';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema
      }
    ])
  ]
})
export class MembersModule {}
