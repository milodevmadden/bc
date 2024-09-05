import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1) ,ParseIntPipe) page: number, 
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {

    return this.membersService.findAll(page, limit);
  }

  @Patch('forgot/:id')
  forgotPass(@Param('id') id: string){
    return this.membersService.resetPassword(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
