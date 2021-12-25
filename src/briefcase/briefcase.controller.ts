import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BriefcaseService } from './briefcase.service';
import { CreateBriefcaseDto } from './dto/create-briefcase.dto';
import { UpdateBriefcaseDto } from './dto/update-briefcase.dto';

interface TinkoffParams {
  url: string,
  secret: string
}

@ApiTags('Портфели')
@Controller('briefcase')
export class BriefcaseController {
  constructor(private readonly briefcaseService: BriefcaseService) {}
  
  @ApiOperation({ summary: 'Создание портфеля' })
  @Post()
  @HttpCode(201)
  create(@Body() createBriefcaseDto: CreateBriefcaseDto) {
    return this.briefcaseService.create(createBriefcaseDto);
  }
  @ApiOperation({ summary: 'Получение портфелей' })
  @Get()
  findAll(@Req() request: Request) {
    const body:any = request.body
    return this.briefcaseService.findAll(body);
  }

  @ApiOperation({ summary: 'Получения портфеля по id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.briefcaseService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение портфеля по id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBriefcaseDto: UpdateBriefcaseDto) {
    return this.briefcaseService.update(+id, updateBriefcaseDto);
  }

  @ApiOperation({ summary: 'Удаление портфеля по id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.briefcaseService.remove(+id);
  }
}
