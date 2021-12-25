import { Controller, Get, Post, Body, Patch, Param, Delete, Head, Headers, Query } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { CreateSandboxDto } from './dto/create-sandbox.dto';
import { UpdateSandboxDto } from './dto/update-sandbox.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBalanceDto } from './dto/create-balance.dto';

@ApiTags('Песочница тинькофф')
@Controller('sandbox')
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) { }

  @ApiOperation({ summary: 'Регистрация клиента в песочнице' })
  @Post('/register')
  register(@Headers() headers) {
    return this.sandboxService.register(headers);
  }

  @ApiOperation({ summary: 'Выставление баланса по валюте' })
  @Post('/set-balance')
  setBalance(@Headers() headers, @Body() createBalanceDto: CreateBalanceDto) {//SB6764856
    return this.sandboxService.setBalance(headers, createBalanceDto);
  }

}
