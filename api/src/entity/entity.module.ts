import { Module } from '@nestjs/common'
import { EntityService } from './entity.service'
import { EntityController } from './entity.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Entity } from './entity'

@Module({
    imports: [TypeOrmModule.forFeature([Entity])],
    exports: [TypeOrmModule],

    controllers: [EntityController],
    providers: [EntityService],
})
export class EntityModule {}
