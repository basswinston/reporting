/*import { Injectable } from '@nestjs/common';

@Injectable()
export class IncidentService {}
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from './incident';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class IncidentService {

    // we can create and inject a repository for our incidents right in the constructor
    constructor(@InjectRepository(Incident) private repo: Repository<Incident>) {}

    // get all
    async getAllIncidents(): Promise<Incident[]> {
        // we can now just call straight to our repo, using its pre-defined methods
        return await this.repo.find({
            relations: {
                reports: {
                    report_user: true
                }
            }
        });
    }

    // get by ID
    async getIncidentById(idToFind: number): Promise<Incident> {
        // where: findOneOrFail() specifies a condition to search for an incident whose id matches idToFind
        return await this.repo.findOneOrFail({
            where: {
                id: idToFind
            },
            relations: {
                reports: {
                    report_user: true
                }
            }
        }).catch(() => {
            throw new HttpException(`Incident with ID ${idToFind} does not exist!`, HttpStatus.NOT_FOUND)
        })
    }

    // create one
    async createIncident(newIncident: Incident): Promise<Incident> {
        await this.repo.exists({
            where: {
                id: newIncident.id
            }
        }).then(exists => {
            if (exists)
                throw new HttpException(`Incident with ID ${newIncident.id} already exists!`, HttpStatus.BAD_REQUEST);
        })

        return await this.repo.save(newIncident);
    }

    // update one
    async updateIncident(routeId: number, incidentToUpdate: Incident) {
        // checking if the route ID and the one in the body match
        if (routeId != incidentToUpdate.id) {
            throw new HttpException(`Route ID and Body ID do not match!`, HttpStatus.BAD_REQUEST);
        }

        // checking that the Incident we want to update exists in the database already
        // if it doesn't we'd create a new one, which we don't want
        await this.repo.exists({
            where: {
                id: incidentToUpdate.id
            }
        }).then(exists => {
            if (!exists)
                throw new HttpException(`Incident with ID ${incidentToUpdate.id} does not exist!`, HttpStatus.NOT_FOUND);
        })

        return await this.repo.save(incidentToUpdate);
    }

    // delete one
    async deleteIncident(id: number): Promise<DeleteResult> {
        return await this.repo.delete(id);
    }
}
