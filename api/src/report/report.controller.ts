import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from "./report";
import { DeleteResult } from 'typeorm';
import { CreateReportDto } from './dto/create-report-dto';
import { UpdateReportDto } from './dto/update-report-dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @HttpCode(200)
  getAllReports(): Promise<Report[]> {
    return this.reportService.getAllReports();
  }

  @Get(':id')
  @HttpCode(200)
  getReportById(@Param('id') idToFind: number): Promise<Report> {
    return this.reportService.getReportById(idToFind);
  }

  @Post('/create')
  @HttpCode(201)
  createReport(@Body() newReport: CreateReportDto) {
    return this.reportService.createReport(newReport);
  }

  @Put('/update/:id')
  @HttpCode(200)
  async updateReport(@Param('id') routeId: number, @Body() reportToUpdate: UpdateReportDto) {
    const report = await this.reportService.getReportById(routeId);
    return await this.reportService.updateReport(report, reportToUpdate);
  }


  @Delete('/delete/:id')
  @HttpCode(204)
  deleteReport(@Param('id') id: number): Promise<DeleteResult> {
    return this.reportService.deleteReport(id);
  }
}
