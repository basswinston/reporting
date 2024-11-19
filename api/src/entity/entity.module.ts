import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entitys } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entitys])],
  exports: [TypeOrmModule],

  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}