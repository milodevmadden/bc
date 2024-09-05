import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './entities/admin.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {

  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>
  ){}

  async create(createAdminDto: CreateAdminDto) {

    const { username, email, pass } = createAdminDto

    try {

      const user = await this.findOne(email)

      if(user) return { ok: false, msg: 'User already exist' }

      const hash = await bcrypt.hash(pass, 10);
      
      const admin = await this.adminModel.create({ username, email, password: hash })

      return {
        ok: true,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email
        }
      };      

    } catch (error) {
      return {
        ok: false,
        error: error.message
      }
    }


  }

  async findAll() {

    try {

      const admins = await this.adminModel.find({});
     
      return {
        ok: true, 
        admins
      }  

    } catch (error) {
      return {
        ok: false,
        error: error.message
      }
    }


  }

  async findOne(email: string) {

    try {

      const admin = await this.adminModel.findOne({ email })

      return {
        ok: true,
        admin
      };  

    } catch (error) {
      return {
        ok: false,
        error: error.message
      }
    }


    
  }


}
