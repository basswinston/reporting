import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Incident } from './incident'
import { DeleteResult, Repository } from 'typeorm'
import { CreateIncidentDto } from './dto/create-incident-dto'
import { UpdateIncidentDto } from './dto/update-incident-dto'

@Injectable()
export class IncidentService {
    // we can create and inject a repository for our incidents right in the constructor
    constructor(
        @InjectRepository(Incident) private repo: Repository<Incident>,
    ) {}

    // get all
    async getAllIncidents(): Promise<Incident[]> {
        // we can now just call straight to our repo, using its pre-defined methods
        return await this.repo.find({
            //relations: {
            //    reports: {
            //        report_user: true
            //    }
            //}
        })
    }

    // get by ID
    async getIncidentById(idToFind: number): Promise<Incident> {
        // where: findOneOrFail() specifies a condition to search for an incident whose id matches idToFind
        return await this.repo
            .findOneOrFail({
                where: {
                    incidentId: idToFind,
                },
                //relations: {
                //    reports: {
                //        report_user: true
                //    }
                //}
            })
            .catch(() => {
                throw new HttpException(
                    `Incident with ID ${idToFind} does not exist!`,
                    HttpStatus.NOT_FOUND,
                )
            })
    }

    // creates a new Incident
    async createIncident(data: CreateIncidentDto) {
        const newIncident = this.repo.create(data)
        return await this.repo.save(newIncident)
    }

    // update given Incident
    async updateIncident(incident: Incident, updateData: UpdateIncidentDto) {
        const updatedIncident = this.repo.merge(incident, updateData)
        return await this.repo.save(updatedIncident)
    }

    // delete given Incident
    async deleteIncident(id: number): Promise<DeleteResult> {
        return await this.repo.delete(id)
    }
}
