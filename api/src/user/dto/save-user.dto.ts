import {
    IsNotEmpty,
    IsOptional,
    IsEmail,
    IsPhoneNumber,
    IsEnum,
} from 'class-validator'
import { UserRole } from '../user.entity'

export class SaveUserDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsPhoneNumber()
    phone: string

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole
}
