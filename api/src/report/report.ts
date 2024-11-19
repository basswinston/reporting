import {
    Column,
    Entity as _Entity,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm'
import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator'
import { User } from '../user/user'
import { Entity } from '../entity/entity'
import { Incident } from '../incident/incident'

@_Entity()
export class Report {
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    @IsNumber()
    reportId: number

    @Column()
    @IsNotEmpty()
    @IsString()
    reportTitle: string

    @Column()
    @IsString()
    reportType: string

    @Column()
    @IsString()
    reportStatus: string

    @Column()
    @IsString()
    reporterId: number

    @ManyToOne(() => User, (user) => user.authoredReports)
    author: User

    @Column()
    @IsString()
    assignedTo: number

    @ManyToOne(() => User, (user) => user.authoredReports)
    assignedUser: User

    @Column()
    @IsNotEmpty()
    @IsBoolean()
    isResolved: boolean

    @Column()
    @IsNotEmpty()
    @IsDate()
    creationDate: Date

    @Column()
    @IsNotEmpty()
    @IsDate()
    lastEdited: Date

    @Column()
    @IsNotEmpty()
    @IsString()
    incidentId: number

    @OneToOne(() => Incident)
    @JoinColumn()
    incident: Incident

    @ManyToMany(() => Entity, (entity) => entity.reports)
    @JoinTable()
    entities: Entity[]
}
