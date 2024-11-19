import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import {
    IsBoolean,
    IsDate,
    isNotEmpty,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator'
import { report_user } from 'src/report_user/report_user'
import { report_entities_entity } from 'src/report_entities_entity/report_entities_entity'
import { incident } from 'src/incident/incident'

@Entity()
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

    @Column()
    @IsString()
    assignedTo: number

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

    @ManyToOne(() => Report_user, (report_user) => report_user.userId)
    reportUser: Report_user

    @OnetoOne(
        () => Report_entities_entity,
        (report_entities_entity) => report_entities_entity.report_id,
    )
    reports: Report_entities_entity

    @OnetoOne(() => Incident, (incident) => incident.report_id)
    incident: Incident
}
