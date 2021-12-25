import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBriefcaseDto } from './create-briefcase.dto';

export class UpdateBriefcaseDto extends PartialType(CreateBriefcaseDto) {}
