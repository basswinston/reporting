import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { IncidentService } from './incident/incident.service';
import { IncidentModule } from './incident/incident.module';
import { StudentModule } from './student/student.module';
import { IncidentModule } from './incident/incident.module';

@Module({
    imports: [IncidentModule, StudentModule],
    controllers: [AppController],
    providers: [AppService, IncidentService],
})
export class AppModule {}
