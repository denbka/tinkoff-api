import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { TinkoffSecret } from 'src/tinkoff-secret/tinkoff-secret.model'
import { TinkoffBrokerAccount } from 'src/tinkoff-account/tinkoff-account.model'
interface UserCreationAttrs {
  email: string
  password?: string
  id?: number
  type?: string
  sex?: number
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number

  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public email: string

  @ApiProperty({ example: '123456', description: 'Пароль', required: false })
  @Column({ type: DataType.STRING,  allowNull: true })
  public password: string

  @ApiProperty({ example: 'true', description: 'Забанен или нет', required: false })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  public banned: boolean

  @ApiProperty({ example: 'Забанен из-за нарушения правил', description: 'Причина бана', required: false})
  @Column({ type: DataType.STRING, allowNull: true })
  public banReason: string

  @ApiProperty({ example: '1 - женский, 2 - мужской, 0 - не указан', description: 'Пол', required: false})
  @Column({ type: DataType.INTEGER, allowNull: true })
  public sex: number
  
  @ApiProperty({ example: 'vk', description: 'Тип регистрации' })
  @Column({ type: DataType.STRING, defaultValue: 'origin' })
  public type: string

  // @ApiProperty({ example: 'brokerAccountId', description: 'ID брокерского аккаунта' })
  // @Column({ type: DataType.STRING, allowNull: true })
  // public brokerAccountId: string


  @ForeignKey(() => TinkoffSecret)
  @Column({ type: DataType.INTEGER })
  public secret_id: number

  @ForeignKey(() => TinkoffBrokerAccount)
  @Column({ type: DataType.INTEGER })
  public tinkoff_broker_account_id: number


  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasOne(() => TinkoffSecret)
  secret: TinkoffSecret

  @HasOne(() => TinkoffBrokerAccount)
  tinkoff_broker_account: TinkoffBrokerAccount
}
