import { Column, DataType, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"

interface BriefcaseCreationAttrs {
  name: string
}

@Table({ tableName: 'briefcases' })
export class Briefcase extends Model<Briefcase, BriefcaseCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number

  @ApiProperty({ example: 'Консервативный', description: 'Название портфеля' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string
}
