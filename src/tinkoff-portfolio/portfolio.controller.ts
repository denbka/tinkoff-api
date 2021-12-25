import { Controller, Get, Post, Body, Patch, Param, Delete, Head, Headers, Query } from '@nestjs/common';
import { SandboxService } from './portfolio.service';
import { CreateSandboxDto } from './dto/create-sandbox.dto';
import { UpdateSandboxDto } from './dto/update-sandbox.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBalanceDto } from './dto/create-balance.dto';

@ApiTags('Получение тинькофф портфолио')
@Controller('portfolio')
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) { }

  @Get('/info')
  getPortfolio(@Headers() headers) {
    return this.sandboxService.getPortfolio(headers)
  }

  @Get('/currencies')
  getPortfolioCurrencies(@Headers() headers) {
    return this.sandboxService.getPortfolioCurrencies(headers)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSandboxDto: UpdateSandboxDto) {
  //   return this.sandboxService.update(+id, updateSandboxDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sandboxService.remove(+id);
  // }
}
