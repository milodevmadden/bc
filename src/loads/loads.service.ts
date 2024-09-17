import { Injectable } from '@nestjs/common';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Load } from './entities/load.entity';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';

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

  async testing(data) {
    return {
      ok: true,
      message: 'Hasta la vista baby', 
      data
    }
  }

  async processExcel(file: any) {
    const workbook = new ExcelJS.Workbook();
  
    // Leer el archivo desde el buffer
    await workbook.xlsx.load(file.buffer);
  
    // Obtener la primera hoja
    const worksheet = workbook.worksheets[0];
  
    // Extraer datos de cada fila y celda
    const sheetData: any[][] = [];
  
    worksheet.eachRow((row, rowNumber) => {
      const rowData: any[] = [];
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        rowData.push(cell.value || ""); // Asegúrate de que los valores vacíos se manejen correctamente
      });
      sheetData.push(rowData);
    });
  
    // Convertir los datos de la hoja en un string
    const stringData = sheetData.map(row => row.join(',')).join('\n');
  
    console.log('Excel Data:', stringData);
  
    return {
      ok: true,
      message: 'Excel file processed successfully',
      data: stringData,
    };
  }

}
