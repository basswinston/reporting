import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
// Import from other module to create relations

import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator'

/** Schema:

      incident_id - PK - Unique - PK - Not Null
      incident_date - date - nullable
      incident_location - varchar - nullable
      related_accounts - text - nullable
      transaction_details - text - nullable
      description - text - nullable
*/

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

    /**
     * Each report has a single Incident it is reporting
     * Leading to a 1-1 relationship
     */

    @OneToOne(() => Report, (report) => report.incident)
    reports: Report
}
