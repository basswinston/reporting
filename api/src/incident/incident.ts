import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Report } from '../report/report'

@Entity()
export class Incident {
    @PrimaryGeneratedColumn()
    incidentId: number

    @Column()
    incidentDate: Date

    @Column()
    incidentLocation: String

    @Column()
    relatedAccounts: String

    @Column()
    transactionDetails: String

    @Column()
    description: String

    /**
     * Each report has a single Incident it is reporting,
     * leading to a 1-1 relationship
     */
    @OneToOne(() => Report, (report) => report.incidentId)
    reports: Report
}
