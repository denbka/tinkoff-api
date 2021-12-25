import axios from '.pnpm/axios@0.21.1/node_modules/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AuthService } from 'src/auth/auth.service';
import { BrokerAccountDto } from 'src/tinkoff-account/dto/account.dto';
import { BrokerAccountService } from 'src/tinkoff-account/tinkoff-account.service';
import { TinkoffSecretService } from 'src/tinkoff-secret/tinkoff-secret.service';
import { UsersService } from 'src/users/users.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateSandboxDto } from './dto/update-sandbox.dto';
// 2020413072 prod acc id

// t._dRpeFG2a0xzBLepiyPqYueCOxUZJ4LUZe5rK5ue4adwHXCSPYA0opVI_ypL9QvYHpDFpD_shwnbZypROiwLPQ sandbox
// t.UElz0LsnH2c9t3wdg6nJIklrRiM-PxVfTqghWlNdfANvtFylMmhWrWIsaPk3fQyel19o-MJfZECVw72goNtkGQ prod

interface SandboxRegisterPayload {
  brokerAccountType: string,
  brokerAccountId: string
}
interface SandboxRegister {
    trackingId: string,
    payload: SandboxRegisterPayload
    status: string
}

@Injectable()
export class SandboxService {
  constructor(
    private tinkoffSecret: TinkoffSecretService,
    private tinkoffBrokerAccountService: BrokerAccountService,
    private authService: AuthService
  ) { }

  async register(headers: Headers) {
    const secret = await this.tinkoffSecret.getToken(headers)

    const response: AxiosResponse<SandboxRegister> = await axios.post('https://api-invest.tinkoff.ru/openapi/sandbox/sandbox/register', {}, {
      headers: {
        'Authorization': `Bearer ${secret.get('token')}`
      }
    })
    //SB6764856
    return await this.tinkoffBrokerAccountService.set({
      brokerAccountId: response.data.payload.brokerAccountId
    }, headers)
  }

  async setBalance(headers: Headers, balanceDto: CreateBalanceDto) {
    const secret = await this.tinkoffSecret.getToken(headers)

    const userToken = this.authService.getUserToken(headers)
    
    const { brokerAccountId }: BrokerAccountDto = await this.tinkoffBrokerAccountService.getAccountByUser(userToken.id)
    try {
      const response = await axios.post('https://api-invest.tinkoff.ru/openapi/sandbox/sandbox/currencies/balance', { ...balanceDto }, {
        headers: {
          'Authorization': `Bearer ${secret.get('token')}`
        },
        params: {
          brokerAccountId
        }
      })


      return response.data
    } catch (e) {
      return e
    }
  }

  async getPortfolioCurrencies(headers: Headers, brokerAccountId: string) {
    const secret = await this.tinkoffSecret.getToken(headers)

    const response = await axios.get('https://api-invest.tinkoff.ru/openapi/sandbox/portfolio/currencies', {
      headers: {
        'Authorization': `Bearer ${secret.get('token')}`
      },
      params: {
        brokerAccountId
      }
    })
    return response.data
  }

  async getPortfolio(headers: Headers, brokerAccountId: string) {
    const secret = await this.tinkoffSecret.getToken(headers)

    const response = await axios.get('https://api-invest.tinkoff.ru/openapi/sandbox/portfolio', {
      headers: {
        'Authorization': `Bearer ${secret.get('token')}`
      },
      params: {
        brokerAccountId
      }
    })
    return response.data
  }

}
