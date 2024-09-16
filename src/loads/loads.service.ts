import { Injectable } from '@nestjs/common';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Load } from './entities/load.entity';
import { Model } from 'mongoose';

@Injectable()
export class LoadsService {

  constructor(
    @InjectModel(Load.name)
    private readonly loadModel: Model<Load>
  ){}

  async create(createLoadDto: CreateLoadDto) {
    const { equipment, origin, destination, pickup_date, delivery_date } = createLoadDto
    const load = await this.loadModel.create({
      equipment, origin, destination, pickup_date, delivery_date
    })
    return load
  }

  findAll() {
    return `This action returns all loads`;
  }

  testing(data) {
    return {
      ok: true,
      message: 'Hasta la vista baby', 
      data
    }
  }

}
