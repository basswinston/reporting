import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { validate } from './env.validation'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { IncidentModule } from './incident/incident.module'
import { UserModule } from './user/user.module'
import { ReportModule } from './report/report.module'

@Module({
    imports: [
        ConfigModule.forRoot({ validate }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            namingStrategy: new SnakeNamingStrategy(),
        }),
        UserModule,
        IncidentModule,
        ReportModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
