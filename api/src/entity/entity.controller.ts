import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { EntityService } from './entity.service'
import { Entity } from './entity'
import { DeleteResult } from 'typeorm'

@Controller('entity')
export class EntityController {
    constructor(private readonly entityService: EntityService) {}

    // get all
    @Get()
    @HttpCode(200)
    getAllEntities(): Promise<Entity[]> {
        return this.entityService.getAllEntities()
    }

    // get by id
    @Get(':id')
    @HttpCode(200)
    getEntityById(@Param('id') idToFind: number): Promise<Entity> {
        return this.entityService.getEntityById(idToFind)
    }

    // update a entity
    @Put('/update/:id')
    @HttpCode(200)
    updateEntity(@Param('id') routeId: number, @Body() entityToUpdate) {
        return this.entityService.updateEntity(routeId, entityToUpdate)
    }

    // create new entity
    @Post('/create')
    @HttpCode(201)
    createEntity(@Body() newEntity: Entity) {
        return this.entityService.createEntity(newEntity)
    }

    // delete an entity
    @Delete('/delete/:id')
    @HttpCode(204)
    deleteEntity(@Param('id') id: number): Promise<DeleteResult> {
        return this.entityService.deleteEntity(id)
    }
}
