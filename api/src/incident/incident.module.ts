import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './incident';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  exports: [TypeOrmModule],
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}