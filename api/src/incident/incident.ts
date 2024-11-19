import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator'
import { Report } from '../report/report'

@Entity()
export class Incident {
    // PK
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    @IsNumber()
    incidentId: number

    @Column()
    @IsDate()
    incidentDate: Date

    @Column()
    @IsString()
    //@Length()
    incidentLocation: String

    @Column()
    @IsString()
    relatedAccounts: String

    @Column()
    @IsString()
    transactionDetails: String

    @Column()
    @IsString()
    description: String

    @OneToOne(() => Report)
    reports: Report
}
