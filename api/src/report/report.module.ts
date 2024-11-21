import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from './report'
import { User } from '../user/user'
import { Entity } from '../entity/entity'
import { Incident } from '../incident/incident'

@Module({
    imports: [TypeOrmModule.forFeature([Report, User, Entity, Incident])],
    exports: [TypeOrmModule],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {}
