import { Module } from '@nestjs/common'
import { IncidentService } from './incident.service'
import { IncidentController } from './incident.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Incident } from './incident'
import { Report } from 'src/report/report'

@Module({
    imports: [TypeOrmModule.forFeature([Incident, Report])],
    exports: [TypeOrmModule],
    controllers: [IncidentController],
    providers: [IncidentService],
})
export class IncidentModule {}
