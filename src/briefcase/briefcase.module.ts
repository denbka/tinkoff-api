import { Module } from '@nestjs/common';
import { BriefcaseService } from './briefcase.service';
import { BriefcaseController } from './briefcase.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Briefcase } from './briefcase.model';

@Module({
  controllers: [BriefcaseController],
  providers: [BriefcaseService],
  imports: [
    SequelizeModule.forFeature([Briefcase]),
    
  ]
})
export class BriefcaseModule {}
