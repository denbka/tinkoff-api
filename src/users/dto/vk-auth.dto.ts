import { ApiProperty } from "@nestjs/swagger";

export class VkDto {
  @ApiProperty({ example: '53de386ccf3d56d36e', description: 'Код после авторизации в вк' })
  readonly code: string
}
