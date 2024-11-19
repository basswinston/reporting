import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Report } from './report'
import { DeleteResult, Repository } from 'typeorm'

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
    async createReport(newReport: Report): Promise<Report> {
        await this.repo
            .exists({
                where: {
                    reportId: newReport.reportId,
                },
            })
            .then((exists) => {
                if (exists)
                    throw new HttpException(
                        `Student with ID ${newReport.reportId} already exists!`,
                        HttpStatus.BAD_REQUEST,
                    )
            })

        return await this.repo.save(newReport)
    }

    // update given report
    async updateReport(routeId: number, reportToUpdate: Report) {
        // checking if the route ID and the one in the body match
        if (routeId != reportToUpdate.reportId) {
            throw new HttpException(
                `Route ID and Body ID do not match!`,
                HttpStatus.BAD_REQUEST,
            )
        }

        // checking that the Report we want to update exists in the database already
        await this.repo
            .exists({
                where: {
                    reportId: reportToUpdate.reportId,
                },
            })
            .then((exists) => {
                if (!exists)
                    throw new HttpException(
                        `Report with ID ${reportToUpdate.reportId} does not exist!`,
                        HttpStatus.NOT_FOUND,
                    )
            })

        return await this.repo.save(reportToUpdate)
    }

    // delete given report
    async deleteReport(id: number): Promise<DeleteResult> {
        return await this.repo.delete(id)
    }
}
