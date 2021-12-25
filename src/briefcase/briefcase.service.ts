import axios from '.pnpm/axios@0.21.1/node_modules/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Briefcase } from './briefcase.model';
import { CreateBriefcaseDto } from './dto/create-briefcase.dto';
import { UpdateBriefcaseDto } from './dto/update-briefcase.dto';
const OpenAPI = require('@tinkoff/invest-openapi-js-sdk')

@Injectable()
export class BriefcaseService {
  
  constructor(@InjectModel(Briefcase) private briefcaseRepository: typeof Briefcase) {}

  async create(createBriefcaseDto: CreateBriefcaseDto) {
    
    // try {
      // return await this.briefcaseRepository.create(createBriefcaseDto)
    // } catch(e) {
    //   return e
    // }
  }

  async findAll({url, secret}) {
    const socketURL = ''
    console.log(url, secret)
    const api = new OpenAPI({ apiURL: url, secretToken: secret, socketURL });
    // await api.sandboxClear();
    // const { figi } = await api.searchOne({ ticker: 'AAPL' });
    await api.setCurrenciesBalance({ currency: 'USD', balance: 1000 });
  }

  findOne(id: number) {
    return `This action returns a #${id} briefcase`;
  }

  async update(id: number, updateBriefcaseDto: UpdateBriefcaseDto) {
    return ''
    // return this.briefcaseRepository.update(updateBriefcaseDto)
    // return await this.briefcaseRepository.update(updateBriefcaseDto)
  }

  remove(id: number) {
    return `This action removes a #${id} briefcase`;
  }
}
