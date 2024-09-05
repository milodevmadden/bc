import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.loadsService.findAll();
  }

}
