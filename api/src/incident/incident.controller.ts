/*import { Controller } from '@nestjs/common';

@Controller('incident')
export class IncidentController {}*/

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { Incident } from './incident';
import { DeleteResult } from 'typeorm';

@Controller('incident')
export class IncidentController {

  constructor(private readonly incidentService: IncidentService) {}

  // get all
  @Get()
  @HttpCode(200) //default code if successful, if errors are thrown they will override
  //this will return a Promise that takes in an array of Incidents and once fulfilled will return all incidents
  getAllIncidents(): Promise<Incident[]>{
    return this.incidentService.getAllIncidents();
  }

  // get by id
  @Get(':id')
  @HttpCode(200)
  // using @Param to get the path variable
  // by itself, it return an object with all params as key-value pairs
  // if you specify a param in the paranthesis, it returns just that value
  getIncidentById(@Param('id') idToFind: number): Promise<Incident> {
    return this.incidentService.getIncidentById(idToFind);
  }

  // create new incident
  @Post('/create')
  @HttpCode(201)
  createIncident(@Body() newIncident: Incident) {
    return this.incidentService.createIncident(newIncident);
  }

  // update an incident
  @Put('/update/:id')
  @HttpCode(200)
  updateIncident(@Param('id') routeId: number, @Body() incidentToUpdate) {
    return this.incidentService.updateIncident(routeId, incidentToUpdate);
  }

  // delete an incident
  @Delete('/delete/:id')
  @HttpCode(204)
  deleteIncident(@Param('id') id: number): Promise<DeleteResult> {
    return this.incidentService.deleteIncident(id);
  }

}