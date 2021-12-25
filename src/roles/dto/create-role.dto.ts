import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty({ example: 'user', description: 'Название роли' })
  readonly name: string
  @ApiProperty({ example: 'Модератор', description: 'Описание роли' })
  readonly description: string
}
