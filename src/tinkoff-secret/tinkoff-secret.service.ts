import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { SecretDto } from './dto/secret.dto';
import { TinkoffSecret } from './tinkoff-secret.model';

@Injectable()
export class TinkoffSecretService {
  constructor(
    @InjectModel(TinkoffSecret) private secretRepository: typeof TinkoffSecret,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  // t.R8UyLgEKC-X2MiG3y8hdDPXzgIKEOgpR1SNHMc3ktRaKrbvDCM4Xt0vGPPMGJlcENwt8TzEB5ZTNBPAyRFGAGw
  async setToken(dto: SecretDto, headers: Headers) {
    let secret
    try {
      const userToken = this.authService.getUserToken(headers)
      console.log(userToken.id)
      secret = await this.getTokenByUserId(userToken.id)
      if (secret) {
        secret.setDataValue('token', dto.token)
        secret.save()
      } else {
        secret = await this.secretRepository.create({...dto, user_id: userToken.id})
      }

      const user = <User> await this.usersService.getUserByEmail(userToken.email)
      user.setDataValue('secret_id', secret.get('id'))
      user.save()

      return secret
    } catch(error) {
      console.log(error)
    }
  }

  async getTokenByUserId(user_id: string) {
    return await this.secretRepository.findOne({ where: { user_id } })
  }

  async getToken(headers: Headers) {
    const userToken = this.authService.getUserToken(headers)

    const secret = await this.getTokenByUserId(userToken.id)
    console.log(secret)
    if (!secret) {
      throw new HttpException('Секретный ключ не найден', 404)
    }
    return secret
  }

  async deleteToken(headers: Headers) {
    const userToken = this.authService.getUserToken(headers)
    if (!userToken) {
      throw new NotFoundException({}, 'Секретный ключ не найден')
    }
    return await this.secretRepository.destroy({ where: { user_id: userToken.id }, cascade: true })
  }
}
