import { User } from './users.model'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from 'src/roles/roles.service'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
import { CreateUserSocialDto } from './dto/create-user-social.dto'

interface TPlace {
  id: number,
  title: string
}

interface TProfileVk {
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
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) {}

  async createUser(dto: CreateUserDto | TProfileVk) {
    const user = await this.userRepository.create(dto)
    
    const role = await this.rolesService.getRoleByName('admin')

    await user.$set('roles', [role.id])
    user.setDataValue('roles', [role])

    return user
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } })
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } })
  }


  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId)
    const role = await this.rolesService.getRoleByName(addRoleDto.name)

    if(role && user) {
      await user.$add('role', role.id)
      return addRoleDto
    }

    throw new HttpException('Пользователь или роль не найдена', HttpStatus.BAD_REQUEST)
  }

  async ban(banDto: BanUserDto) {
    const user = await this.userRepository.findByPk(banDto.userId)
    if (user) {
      await user.setDataValue('banned', true)
      await user.setDataValue('banReason', banDto.banReason)
      await user.save()

      return user
    }
    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
  }
}
