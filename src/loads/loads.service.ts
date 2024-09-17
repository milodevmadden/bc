import { Injectable } from '@nestjs/common';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Load } from './entities/load.entity';
import { envs } from 'src/config/envs';
import OpenAI from 'openai';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';

@Injectable()
export class LoadsService {
  private client: OpenAI;

  constructor(
    @InjectModel(Load.name)
    private readonly loadModel: Model<Load>
  ) {
    this.client = new OpenAI({
      apiKey: envs.openai_api_key,
    });
  }

  async create(createLoadDto: CreateLoadDto) {
    const { equipment, origin, destination, pickup_date, delivery_date } =
      createLoadDto;
    const load = await this.loadModel.create({
      equipment,
      origin,
      destination,
      pickup_date,
      delivery_date,
    });
    return load;
  }

  findAll() {
    return `This action returns all loads`;
  }

  async testing(data) {

    const res = await this.extractLoadInfoFromText(data)
    console.log(res)

    return {
      ok: true,
      message: 'Hasta la vista baby',
      data,
    };
  }

  async processExcel(file: any) {
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(file.buffer);

    const worksheet = workbook.worksheets[0];

    const sheetData: any[][] = [];

    worksheet.eachRow((row, rowNumber) => {
      const rowData: any[] = [];
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        rowData.push(cell.value || '');
      });
      sheetData.push(rowData);
    });

    const stringData = sheetData.map((row) => row.join(',')).join('\n');

    console.log('Excel Data:', stringData);

    return {
      ok: true,
      message: 'Excel file processed successfully',
      data: stringData,
    };
  }

  /**
   * Método para procesar el texto y extraer los campos de interés
   * usando OpenAI function calling.
   */
  async extractLoadInfoFromText(text: string) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-0613',
      messages: [
        {
          role: 'system',
          content:
            'You are a system that extracts structured data from shipping information in any format. it could be just one load or many. In any case just return an array with objects it does not matter if is one or many',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      functions: [
        {
          name: 'extract_loads',
          description: 'Extracts shipping data from text.',
          parameters: {
            type: 'object',
            properties: {
              equipment: { type: 'string' },
              origin: { type: 'string' },
              destination: { type: 'string' },
              pickup_date: { type: 'string', format: 'date' },
              delivery_date: { type: 'string', format: 'date' },
              shipment_id: { type: 'string' },
              price: { type: 'string' },
            },
            required: [
              'equipment',
              'origin',
              'destination',
              'pickup_date',
              'delivery_date',
              'shipment_id',
              'price',
            ],
          },
        },
      ],
      function_call: { name: 'extract_loads' },
    });

    const extractedData = response.choices[0]?.message?.function_call?.arguments;

    if (extractedData) {
      const parsedData = JSON.parse(extractedData);

      console.log({extractedData})

      // Guardar los datos en MongoDB
      //const load = await this.loadModel.create(parsedData);

      return {
        ok: true,
        message: 'Load information extracted and saved successfully',
      };
    }

    return {
      ok: false,
      message: 'Failed to extract load information',
    };
  }
}
