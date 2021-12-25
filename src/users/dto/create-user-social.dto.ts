import { ApiProperty } from '@nestjs/swagger'

export class CreateUserSocialDto {
  @ApiProperty({ example: 'test@test.ru', description: 'email' })
  readonly email: string
  @ApiProperty({ example: '39581922', description: 'Уникальный идентификатор из соц.сети' })
  readonly id: string
  @ApiProperty({ example: 'vk', description: 'Социальная сеть' })
  readonly type: string
  @ApiProperty({ example: '1 - женский, 2 - мужской, 0 - не указан', description: 'Пол' })
  readonly sex?: number
}
