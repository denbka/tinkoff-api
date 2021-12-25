import { Body, Controller, Delete, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { BrokerAccountDto} from './dto/account.dto';
import { TinkoffBrokerAccount } from './tinkoff-account.model';
import { BrokerAccountService } from './tinkoff-account.service';

@ApiTags('Получение брокерского аккаунта')
@Controller('tinkoff-broker-account')
export class TinkoffBrokerAccountController {

  constructor(private brokerAccountService: BrokerAccountService) {}

  @ApiOperation({ summary: 'Сохранение аккаунта' })
  @ApiResponse({ status: 200, type: TinkoffBrokerAccount })
  @Post('')
  create(@Headers() headers, @Body() accountDto: BrokerAccountDto) {
    return this.brokerAccountService.set(accountDto, headers)
  }

  @ApiOperation({ summary: 'Получение аккаунта' })
  @ApiResponse({ status: 200, type: TinkoffBrokerAccount })
  @Get('')
  get(@Headers() headers) {
    return this.brokerAccountService.get(headers)
  }

  @ApiOperation({ summary: 'Удаление аккаунта' })
  @ApiResponse({ status: 200, type: TinkoffBrokerAccount })
  @Delete('')
  delete(@Headers() headers) {
    return this.brokerAccountService.delete(headers)
  }
}
