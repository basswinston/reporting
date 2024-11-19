import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm'
import { Report } from '../report/report.entity'

export enum UserRole {
    Admin = 'admin',
    Editor = 'editor',
    Ghost = 'ghost',
}

@Entity('report_user')
export class User {
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    phone: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Ghost,
    })
    role: UserRole

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationTime: Date

    @OneToMany(() => Report, (report) => report.reporterId)
    authoredReports: Report[]

    @OneToMany(() => Report, (report) => report.assignedTo)
    assignedReports: Report[]
}
