import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ReportType, ReportStatus } from "../report";

export class CreateReportDto{

    @IsNotEmpty()
    reportTitle: string

    @IsEnum(ReportType)
    reportType: ReportType

    @IsEnum(ReportStatus)
    reportStatus: ReportStatus

    @IsOptional()
    @IsNumber()
    reporterId: number

    @IsOptional()
    @IsNumber()
    assignedTo: number

    @IsNumber()
    incidentId: number

}
