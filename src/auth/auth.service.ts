import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { VkDto } from 'src/users/dto/vk-auth.dto';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const APP_VK_ID = 7575205
const APP_VK_SECRET = 'QhWP9SWgnF8BhNndpMAS'
const APP_VK_SERVICE = 'dbfd7eb7dbfd7eb7dbfd7eb744db8ee812ddbfddbfd7eb784bcf39d08f95c9ff8d572e2'

interface TAccessVk {
  access_token: string,
  expires_in: number,
  user_id: number,
  email: string,
}

interface TPlace {
  id: number,
  title: string
}

export interface TProfileVk {
  first_name: string,
  last_name: string,
  email: string,
  sex?: number,
  bdate?: string,
  country?: TPlace,
  city?: TPlace,
  status?: string,
  phone?: number,
  id: number,
  type: 'vk'
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }



  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  getUserToken(headers: Headers) {
    const header = headers['authorization']
    if (!header) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
    }
    const bearer = header.split(' ')[0]
    const token = header.split(' ')[1]

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
    }
    try {
      return this.jwtService.verify(token)
    } catch(e) {
      throw new HttpException('Инвалидный токен', 403)
    }
  }

  async getMe(headers: Headers) {
    try {
      const tokenUser = this.getUserToken(headers)
      const user = this.usersService.getUserByEmail(tokenUser.email)
      return user

    } catch(error) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
    }
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
    return this.generateToken(user)
  }

  async authByVk(vkDto: VkDto) {
    try {
      const responseAccess: AxiosResponse = await this.getAccessFromVk(vkDto)
      const accessing: TAccessVk = responseAccess.data

      const candidate = await this.usersService.getUserByEmail(accessing.email)

      if (candidate) {
        return this.generateToken(candidate)
      }

      const responseProfile: AxiosResponse = await this.getProfileInfoFromVk(accessing)
      const profile: TProfileVk = {
        ...responseProfile.data.response[0],
        email: accessing.email,
        type: 'vk'
      }

      const user = await this.usersService.createUser(profile)
      return this.generateToken(user)
    } catch (e) {
      const { data, status } = e.response
      throw new HttpException(data, status)
    }
  }

  async getAccessFromVk({ code }: VkDto): Promise<any> {
    console.log(code)
    return axios.get<AxiosRequestConfig>('https://oauth.vk.com/access_token', {
      params: {
        client_id: APP_VK_ID,
        client_secret: APP_VK_SECRET,
        redirect_uri: 'http://localhost:3000/verify/vk/',
        code
      }
    })
  }

  getProfileInfoFromVk({ access_token }: TAccessVk): Promise<AxiosResponse> {
    return axios.get('https://api.vk.com/method/users.get', {
      params: {
        access_token,
        v: '5.131'
      }
    })
  }

  private async generateToken(user: User) {
    return this.jwtService.sign({
      email: user.get('email'),
      id: user.get('id'),
      roles: user.get('roles')
    })
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email)
    if (!user) {
      throw new UnauthorizedException({ message: 'Пользователя с таким email не существует' })
    }
    console.log(user.type)
    if (user.type && user.type !== 'origin') {
      throw new UnauthorizedException({ message: 'Авторизуйтесь через соцсеть' })
    }

    const passportEquals = await bcrypt.compare(userDto.password, user.get('password'))
    
    if (passportEquals) {
      return user
    }
    
    throw new UnauthorizedException({ message: 'Неправильный пароль' })
  }
}
