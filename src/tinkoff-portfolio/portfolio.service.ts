import axios from '.pnpm/axios@0.21.1/node_modules/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { BrokerAccountDto } from 'src/tinkoff-account/dto/account.dto';
import { TinkoffBrokerAccountModule } from 'src/tinkoff-account/tinkoff-account.module';
import { BrokerAccountService } from 'src/tinkoff-account/tinkoff-account.service';
import { TinkoffSecretService } from 'src/tinkoff-secret/tinkoff-secret.service';
import { UsersService } from 'src/users/users.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateSandboxDto } from './dto/update-sandbox.dto';
// 2020413072 prod acc id
@Injectable()
export class SandboxService {
  constructor(
    private tinkoffSecret: TinkoffSecretService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private tinkoffBrokerAccountService: BrokerAccountService,
  ) { }

  async getPortfolioCurrencies(headers: Headers) {
    const secret = await this.tinkoffSecret.getToken(headers)

    const userToken = this.authService.getUserToken(headers)

    const { brokerAccountId }: BrokerAccountDto = await this.tinkoffBrokerAccountService.getAccountByUser(userToken.id)

    try {
      const response = await axios.get('https://api-invest.tinkoff.ru/openapi/sandbox/portfolio/currencies', {
        headers: {
          'Authorization': `Bearer ${secret.get('token')}`
        },
        params: {
          brokerAccountId
        }
      })
      return response.data
    } catch(e) {
      throw new HttpException(e, 400)
    }
  }

  async getPortfolio(headers: Headers) {
    const secret = await this.tinkoffSecret.getToken(headers)

    const userToken = this.authService.getUserToken(headers)

    const { brokerAccountId }: BrokerAccountDto = await this.tinkoffBrokerAccountService.getAccountByUser(userToken.id)

    try {
      const response = await axios.get('https://api-invest.tinkoff.ru/openapi/sandbox/portfolio', {
        headers: {
          'Authorization': `Bearer ${secret.get('token')}`
        },
        params: {
          brokerAccountId
        }
      })
      return response.data
    } catch(e) {
      throw new HttpException(e, 400)
    }
  }

  update(id: number, updateSandboxDto: UpdateSandboxDto) {
    return `This action updates a #${id} sandbox`;
  }

  remove(id: number) {
    return `This action removes a #${id} sandbox`;
  }
}
