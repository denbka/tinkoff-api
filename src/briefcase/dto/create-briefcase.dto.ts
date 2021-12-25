import { ApiProperty } from "@nestjs/swagger"

export class CreateBriefcaseDto {
  @ApiProperty({ example: 'Консервативный', description: 'Название портфеля' })
  readonly name: string
}
