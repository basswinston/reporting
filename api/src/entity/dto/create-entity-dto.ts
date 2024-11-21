import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsPhoneNumber, IsEmail  } from "class-validator";

export class CreateEntityDto{

    @IsNotEmpty()
    @IsString()
    entity_type: string;

    @IsNotEmpty()
    @IsString()
    industry: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;


}