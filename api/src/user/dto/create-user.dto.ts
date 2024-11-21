import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsEnum,
} from 'class-validator'
import { UserRole } from '../user'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsPhoneNumber()
    phone?: string

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole
}
