import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entitys } from './entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class EntityService {

    constructor(@InjectRepository(Entity) private repo: Repository<Entitys>) {}

    // gets all Entities
    async getAllEntities(): Promise<Entitys[]> {
        return await this.repo.find({
 
        });
    }

    // get Entity by id
    async getEntityById(idToFind: number): Promise<Entitys> {
        return await this.repo.findOneOrFail({
            where: {
                id: idToFind
            }
        }).catch(() => {
            throw new HttpException(`Entity with Id ${idToFind} does not exist!`, HttpStatus.NOT_FOUND)
        })
    }

    // creates a new Entity
    async createEntity(newEntity: Entitys): Promise<Entitys> {
        await this.repo.exists({
            where: {
                id: newEntity.entity_id
            }
        }).then(exists => {
            if(exists)
                throw new HttpException(`Entity with ID ${newEntity.entity_id} already exists!`, HttpStatus.BAD_REQUEST)
        })

        return await this.repo.save(newEntity)
    }

    // update Entity
    async updateEntity(routeId: number, entityToUpdate: Entitys) {
        // checking if the route ID and the one in the body match
        if (routeId != entityToUpdate.entity_id) {
            throw new HttpException(`Route ID and Body ID do not match!`, HttpStatus.BAD_REQUEST);
        }

        // checking that the Student we want to update exists in the database already
        // if it doesn't we'd create a new one, which we don't want
        await this.repo.exists({
            where: {
                id: entityToUpdate.entity_id
            }
        }).then(exists => {
            if (!exists)
                throw new HttpException(`Entity with ID ${entityToUpdate.entity_id} does not exist!`, HttpStatus.NOT_FOUND);
        })

        return await this.repo.save(entityToUpdate);
    }

    // delete entity
    async deleteEntity(id: number): Promise<DeleteResult> {
        return await this.repo.delete(id);
    }
}