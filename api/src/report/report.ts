import {
    Column,
    Entity as _Entity,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { User } from '../user/user'
import { Entity } from '../entity/entity'
import { Incident } from '../incident/incident'

export enum ReportType { 
    MoneyLaundering = 'money_laundering',
    Fraud = 'fraud',
    TerroristFinancing = 'terrorist_financing',
    IdentityTheft = 'identity_theft',
    Cybercrime = 'cybercrime',
    TaxEvasion = 'tax_evasion',
    Other = 'other'
}
export enum ReportStatus {  
    New = 'new',
    InProgress = 'in_progress',
    Resolved = 'resolved',
    Rejected = 'rejected',
    Closed = 'closed'
}

@_Entity()
export class Report {
    @PrimaryGeneratedColumn()
    reportId: number

    @Column()
    reportTitle: string

    @Column( { 
        type: 'enum',
        enum: ReportType
     } )
    reportType: ReportType

    @Column({
        type: 'enum',
        enum: ReportStatus,
        default: ReportStatus.New
    })
    reportStatus: ReportStatus

    @Column()
    reporterId: number

    @ManyToOne(() => User, (user) => user.authoredReports)
    author: User

    @Column()
    assignedTo: number

    @ManyToOne(() => User, (user) => user.authoredReports)
    assignedUser: User

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    creationDate: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    lastEdited: Date

    @Column()
    incidentId: number

    @OneToOne(() => Incident)
    @JoinColumn()
    incident: Incident

    @ManyToMany(() => Entity, (entity) => entity.reports)
    @JoinTable()
    entities: Entity[]
}
