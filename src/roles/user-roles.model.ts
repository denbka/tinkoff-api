import { Role } from 'src/roles/roles.model'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/users/users.model'


@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  declare roleId: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare userId: number
}
