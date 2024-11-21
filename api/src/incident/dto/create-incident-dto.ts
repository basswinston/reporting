import { IsDate, IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateIncidentDto{

    @IsDate()
    @IsOptional()
    incidentDate: Date;

    @IsString()
    @IsOptional()
    incidentLocation: String;

    @IsString()
    @IsOptional()
    relatedAccounts: String;

    @IsString()
    @IsOptional()
    transactionDetails: String;

    @IsString()
    @IsOptional()
    description: String;

}