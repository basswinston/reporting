
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// Import from other module to create relations

import { IsNotEmpty, IsNumber, IsString, Length, IsDate } from "class-validator";


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
  incident_id: number;

  @Column()
  @IsDate()
  incident_date: Date;

  @Column()
  @IsString()
  //@Length()
  incident_location: String;

  @Column()
  @IsString()
  related_accounts: String;

  @Column()
  @IsString()
  transaction_details: String;

  @Column()
  @IsString()
  description: String;

  /** 
   * Each report has a single Incident it is reporting
   * Leading to a 1-1 relationship  
  */
  
  @OneToOne(() => Report, report => report.incident)
  reports: Report;
}