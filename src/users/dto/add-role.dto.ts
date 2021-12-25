import { IsNumber, IsString } from "class-validator"

export class AddRoleDto {

  @IsString({ message: 'Название должно быть строкой' })
  readonly name: string

  @IsNumber({}, { message: 'ID должнен быть числом' })
  readonly userId: number
}
