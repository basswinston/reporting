import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user'
import { Report } from '../report/report'

@Module({
    imports: [TypeOrmModule.forFeature([User, Report])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
