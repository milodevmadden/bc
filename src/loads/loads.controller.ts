import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';

@Controller('loads')
export class LoadsController {
  constructor(private readonly loadsService: LoadsService) {}

  @Post()
  create(@Body() body) {
    const {data} = body
    return this.loadsService.create(data);
  }

  @Get('hi')
  hi(){
    return "Hello guys"
  }

  // comment

  @Get()
  findAll() {
    return this.loadsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id){
    return this.loadsService.findOne(id)
  }

  @Post('testing')
  test(@Body() body) {
    const {data, client} = body
    return this.loadsService.testing(data, client)
  }

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  receiveExcel(@UploadedFile() file: any) {
    const result = this.loadsService.processExcel(file);
    return result;
  }


}
