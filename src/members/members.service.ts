import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Model } from 'mongoose';
import { Member } from './entities/member.entity';
import { InjectModel } from '@nestjs/mongoose';
import { generate } from 'generate-password'
import { Role } from './entities/member.entity';

@Injectable()
export class MembersService {


  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<Member>,
  ){}


  async create(createMemberDto: CreateMemberDto) {

    const { username, email, phone } = createMemberDto

    const member = await this.memberModel.findOne({ email })

    if(member){
      return {
        ok: false, 
        error: "This member already exists"
      }
    }

    const password = generate({
      length: 10, numbers: true
    }).toString()   
    
    // send password to the users email

    try {
      const member = await this.memberModel.create({
      username,
      email, 
      phone, 
      password,
      role: 'DRIVER'
    })    

    return {
      ok: true, 
      member
    }

    } catch (error) {
      return {
        ok: false,
        error: error.message
      }
    }

  }

  async findAll(page: number, limit: number) {

    const skip = (page - 1) * limit;

    try {
      
      const members = await this.memberModel.find({}, '-password -__v')
                          .skip(skip)
                          .limit(limit)
                          .sort({ createdAt: -1 })
                          .exec();

      const totalItems = await this.memberModel.countDocuments().exec();

      return {
          ok: true,
          members,
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
      };      

    } catch (error) {
      return {
        ok: false,
        error: error.message
      }
    }


  }

  async remove(id: string) {

    try {
      
      const deleted = await this.memberModel.findByIdAndDelete(id)

      return { ok: true, deleted };    

    } catch (error) {
      return {
        ok: false, error: error.message
      }
    }

  }

  async resetPassword(id: string){
    try {

      const newPassword = generate({
        length: 10,
        numbers: true
      }).toString()

      const updated = await this.memberModel.findByIdAndUpdate(id, {password: newPassword}, {new: true})

      return {
        ok: true, 
        updated
      }
      
    } catch (error) {
        return {
          ok: false,
          error: error.message
        }
    }
  }
  
}
