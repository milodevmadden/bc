import { Injectable } from '@nestjs/common';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Load } from './entities/load.entity';
import { Model } from 'mongoose';
import * as xlsx from 'xlsx';

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

  processExcel(file: any) {
    // Leer el archivo Excel desde el buffer
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;

    // Asumiendo que cada hoja devuelve un array de arrays si usas {header: 1}
    const sheetData: any[][] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { header: 1, raw: false, defval: "" });

    // Convertir los datos en un string
    const stringData = sheetData.map(row => row.join(',')).join('\n');

    // Mostrar el contenido en consola
    console.log('Excel Data:', stringData);

    // Retornar los datos como string
    return {
      ok: true,
      message: 'Excel file processed successfully',
      data: stringData,
    };
  }

}
