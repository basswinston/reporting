import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Report } from './report'
import { DeleteResult, Repository } from 'typeorm'
import { CreateReportDto } from './dto/create-report-dto'
import { UpdateReportDto } from './dto/update-report-dto'

@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

    // returns all reports
    async getAllReports(): Promise<Report[]> {
        return await this.repo.find({
            // relations: {
            //     reportUser: true,
            //     incident: true,
            // },
        })
    }

    // return report using report id
    async getReportById(idToFind: number): Promise<Report> {
        return await this.repo
            .findOneOrFail({
                where: {
                    reportId: idToFind,
                },
                // relations: {
                //     reportUser: true,
                //     incident: true,
                // },
            })
            .catch(() => {
                throw new HttpException(
                    `Report with Id ${idToFind} does not exist!`,
                    HttpStatus.NOT_FOUND,
                )
            })
    }

    // creates a new report
    async createReport(data: CreateReportDto) {
        const newUser = this.repo.create(data)
        return await this.repo.save(newUser)
    }

    // update given report
    async updateReport(report: Report, updateData: UpdateReportDto) {
        const updatedUser = this.repo.merge(report, updateData)
        return await this.repo.save(updatedUser)
    }

    // delete given report
    async deleteReport(id: number): Promise<DeleteResult> {
        return await this.repo.delete(id)
    }
}
