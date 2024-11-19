import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entitys { 

    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    @IsNumber()
    entity_id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    entity_type: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    industry: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    address: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    phone: string;

}