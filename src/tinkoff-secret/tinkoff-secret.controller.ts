import { Body, Controller, Delete, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { SecretDto } from './dto/secret.dto';
import { TinkoffSecret } from './tinkoff-secret.model';
import { TinkoffSecretService } from './tinkoff-secret.service';

@ApiTags('Секретные ключи')
@Controller('tinkoff-secret')
export class TinkoffSecretController {

  constructor(private secretService: TinkoffSecretService) {}

  @ApiOperation({ summary: 'Сохранение токена' })
  @ApiResponse({ status: 200, type: TinkoffSecret })
  @Post('')
  create(@Headers() headers, @Body() secretDto: SecretDto) {
    return this.secretService.setToken(secretDto, headers)
  }

  @ApiOperation({ summary: 'Получение токена' })
  @ApiResponse({ status: 200, type: TinkoffSecret })
  @Get('')
  get(@Headers() headers) {
    return this.secretService.getToken(headers)
  }

  @ApiOperation({ summary: 'Удаление токена' })
  @ApiResponse({ status: 200, type: TinkoffSecret })
  @Delete('')
  delete(@Headers() headers) {
    return this.secretService.deleteToken(headers)
  }
}
