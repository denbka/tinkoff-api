import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { BrokerAccountDto } from './dto/account.dto';
import { TinkoffBrokerAccount } from './tinkoff-account.model';

@Injectable()
export class BrokerAccountService {
  constructor(
    @InjectModel(TinkoffBrokerAccount) private accountRepository: typeof TinkoffBrokerAccount,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  // t.R8UyLgEKC-X2MiG3y8hdDPXzgIKEOgpR1SNHMc3ktRaKrbvDCM4Xt0vGPPMGJlcENwt8TzEB5ZTNBPAyRFGAGw
  async set(dto: BrokerAccountDto, headers: Headers) {
    let brokerAccountId
    try {
      const userToken = this.authService.getUserToken(headers)
      const response: BrokerAccountDto = await this.getAccountByUser(userToken.id, true)
      brokerAccountId = response.brokerAccountId
      console.log(response)
      if (brokerAccountId) {
        brokerAccountId.setDataValue('brokerAccountId', dto.brokerAccountId)
        brokerAccountId.save()
      } else {
        brokerAccountId = await this.accountRepository.create({...dto, user_id: userToken.id})
      }

      const user = <User> await this.usersService.getUserByEmail(userToken.email)
      user.setDataValue('secret_id', brokerAccountId.get('id'))
      user.save()

      return brokerAccountId
    } catch(error) {
      console.log(error)
    }
  }

  async getAccountByUser(user_id: string, nonValidate: boolean = false) {
      const response: BrokerAccountDto = await this.accountRepository.findOne({ where: { user_id }, attributes: ['brokerAccountId'], raw: true })
      if (!response && !nonValidate) throw new HttpException('У пользователя нет брокерского счета', 404)
      return response
  }

  async get(headers: Headers) {
    const userToken = this.authService.getUserToken(headers)

    const brokerAccountId = await this.getAccountByUser(userToken.id)
    console.log(brokerAccountId)
    if (!brokerAccountId) {
      throw new HttpException('Брокерский аккаунт не найден', 404)
    }
    return brokerAccountId
  }

  async delete(headers: Headers) {
    const userToken = this.authService.getUserToken(headers)

    const { brokerAccountId }: BrokerAccountDto = await this.getAccountByUser(userToken.id)
    console.log(brokerAccountId)
    if (!brokerAccountId) {
      throw new HttpException('Брокерский аккаунт не найден', 404)
    }
        
    return await this.accountRepository.destroy({ where: { brokerAccountId }, cascade: true })
  }
}
