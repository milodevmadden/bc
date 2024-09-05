import { Module } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { LoadsController } from './loads.controller';
import { Load, LoadSchema } from './entities/load.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [LoadsController],
  providers: [LoadsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Load.name,
        schema: LoadSchema
      }
    ])
  ]
})
export class LoadsModule {}
