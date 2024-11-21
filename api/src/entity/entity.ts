import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import {
    Column,
    Entity as _Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
} from 'typeorm'
import { Report } from '../report/report'

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

    @ManyToMany(() => Report, (report) => report.entities)
    reports: Report[]
}
