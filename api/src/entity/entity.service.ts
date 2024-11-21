import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity } from './entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateEntityDto } from './dto/create-entity-dto';
import { UpdateEntityDto } from './dto/update-entity-dto';

@Injectable()
export class EntityService {

    constructor(@InjectRepository(Entity) private repo: Repository<Entity>) {}

    // gets all Entities
    async getAllEntities(): Promise<Entity[]> {
        return await this.repo.find({})
    }

    // get Entity by id
    async getEntityById(idToFind: number): Promise<Entity> {
        return await this.repo.findOneOrFail({
            where: { entityId: idToFind }
        }).catch(() => {
            throw new HttpException(`Entity with Id ${idToFind} does not exist!`, HttpStatus.NOT_FOUND)
        })
    }

    // creates a new Entity
    async createEntity(data: CreateEntityDto) {
        const newEntity = this.repo.create(data)
        return await this.repo.save(newEntity)
    }

    // update Entity
    async updateEntity(entitys: Entity, entityToUpdate: UpdateEntityDto) {  
        const updatedEntity = this.repo.merge(entitys, entityToUpdate)
        return await this.repo.save(updatedEntity);
    }

    // delete entity
    async deleteEntity(id: number): Promise<DeleteResult> {
        return await this.repo.delete(id)
    }
}
