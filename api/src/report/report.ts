import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDate, isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { report_user } from "src/report_user/report_user";
import { report_entities_entity } from "src/report_entities_entity/report_entities_entity";
import { incident } from "src/incident/incident";

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    @IsNumber()
    report_id: number

    @Column()
    @IsNotEmpty()
    @IsString()
    report_title: string;

    @Column()
    @IsString()
    report_type: string;

    @Column()
    @IsString()
    report_status: string;

    @Column()
    @IsString()
    reporter_id: number;

    @Column()
    @IsString()
    assigned_to: number;

    @Column()
    @IsNotEmpty()
    @IsBoolean()
    is_resolved: boolean;

    @Column()
    @IsNotEmpty()
    @IsDate()
    creation_date: Date;

    @Column()
    @IsNotEmpty()
    @IsDate()
    last_edited: Date;

    @Column()
    @IsNotEmpty()
    @IsString()
    incident_id: number;

    @ManyToOne(() => Report_user, report_user => report_user.userId)
    report_user: Report_user;


    @OnetoOne(() => Report_entities_entity, report_entities_entity => report_entities_entity.report_id)
    report_entities_entity: Report_entities_entity;

    
    @OnetoOne(() => Incident, incident => incident.report_id)
    incident: Incident;


}
