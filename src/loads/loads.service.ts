import { Injectable } from '@nestjs/common';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Load } from './entities/load.entity';
import { envs } from 'src/config/envs';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import OpenAI from 'openai';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';

@Injectable()
export class LoadsService {
  private client: OpenAI;
  private loadSchema;

  constructor(
    @InjectModel(Load.name)
    private readonly loadModel: Model<Load>,
  ) {
    this.client = new OpenAI({
      apiKey: envs.openai_api_key,
    });

    // Esquema para los campos de cada load
    this.loadSchema = z.object({
      equipment: z.string(),
      origin: z.string(),
      destination: z.string(),
      pickup_date: z.string(),
      delivery_date: z.string(),
      load_id: z.string(),
      customer: z.string(),
      phone: z.string(),
      rate: z.string(),
      old: z.boolean()
    });
  }

  async create(createLoadDto: CreateLoadDto) {
    const { equipment, origin, destination, pickup_date, delivery_date, load_id, customer, phone, rate } =
      createLoadDto;
    const load = await this.loadModel.create({
      equipment,
      origin,
      destination,
      pickup_date,
      delivery_date,
      load_id, 
      customer, 
      phone, 
      rate
    });
    return load;
  }

  async findAll() {
    const loads = await this.loadModel.find({});
    return loads
  }

  async findOne(id) {
    const load = await this.loadModel.findById(id)
    return load
  }

  

  async testing(data, client) {
    // Ajuste para que OpenAI funcione con un objeto en lugar de un array directamente
    const completion = await this.client.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      temperature: 0,
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content:
            `You are an assistant designed to extract specific load information from unstructured text. The user will provide a text containing details about one or more loads. Your task is to extract the data and return it as an array of objects, even if there is only one load. The objects should always contain the following fields: {equipment, origin, destination, pickup_date, delivery_date, load_id, customer, phone, rate, old}. Old is always set to false. If origin or destination is missing, ignore the object and do not add it to the array. If customer is missing set ${client} as customer. If any other field is missing, return an empty string for that field. The vocabulary in the text may vary (e.g., load_id can be referred to as shipment_id or similar), so interpret and return the correct field value. If the text contains multiple loads, return an array with each load as an object. Always maintain the structure: array of objects.`,
        },
        {
          role: 'user',
          content: `Here is the text containing load information. Please extract and return an array of objects, each containing the fields {equipment, origin, destination, pickup_date, delivery_date, load_id, customer, phone, rate}. If origin or destination is missing, ignore the object and do not add it to the array. If customer is missing set ${client} as customer. If any other field is missing, leave it as an empty string. Always set old: false when creating the object. Content: ${data}`,
        },
      ],
      response_format: zodResponseFormat(
        z.object({ loads: this.loadSchema.array() }), // Envolver el array en un objeto
        'loads',
      ),
    });

    const loads = completion.choices[0].message.parsed.loads;
    console.log(loads);

    const savedLoads = [];
    for (const load of loads) {
      const savedLoad = await this.create(load);
      savedLoads.push(savedLoad);
    }

    return {
      ok: true,
      message: 'Working',
      client,
      savedLoads
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
}
