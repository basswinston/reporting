import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Column, Entity as _Entity, PrimaryGeneratedColumn } from 'typeorm'

@_Entity()
export class Entity {
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    @IsNumber()
    entityId: number

    @Column()
    @IsNotEmpty()
    @IsString()
    entityType: string

    @Column()
    @IsNotEmpty()
    @IsString()
    industry: string

    @Column()
    @IsNotEmpty()
    @IsString()
    address: string

    @Column()
    @IsNotEmpty()
    @IsString()
    email: string

    @Column()
    @IsNotEmpty()
    @IsString()
    phone: string
}
