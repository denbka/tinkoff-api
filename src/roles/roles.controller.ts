import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { RolesService } from './roles.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Role } from './roles.model'

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto)
  }

  @ApiOperation({ summary: 'Получение ролей' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles()
  }

  @ApiOperation({ summary: 'Получение ролей' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/:name')
  getByName(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name)
  }
}
