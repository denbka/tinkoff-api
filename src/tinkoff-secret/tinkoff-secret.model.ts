import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/users.model'

interface TokenCreationAttrs {
  token: string,
  user_id: number
}

@Table({ tableName: 'secrets_tokens' })
export class TinkoffSecret extends Model<TinkoffSecret, TokenCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number

  @ApiProperty({ example: 'anfjakne2i1o01w', description: 'Секретный ключ' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  token: string

  @BelongsTo(() => User, 'user_id')
  user: User

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number
}
