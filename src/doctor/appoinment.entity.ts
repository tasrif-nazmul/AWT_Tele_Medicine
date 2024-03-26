import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  import { UserEntity } from "./user.entity";
import { DoctorEntity } from "./doctor.entity";

@Entity("appointment")
export class AppointmentEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // user_id
  // patient_id: number;

  // @Column()
  // user_id
  // doctor_id: number;

  @Column()
  appointment_date: string;

  @Column()
  appointment_time: string;

  @Column({ nullable: true })
  disease: string;

  @Column({ nullable: true }) 
  responseTime: string;

  @Column({ nullable: true }) 
  scheduledTime: string;

  @Column()
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.appointments)
  @JoinColumn({ name: "patient_id" })
  patient: UserEntity;


  // @ManyToOne(() => UserEntity, (user) => user.appointments)
  // @JoinColumn({ name: "doctor_id" })
  // doctor: UserEntity;
  
  @ManyToOne(() => DoctorEntity, (doctor) => doctor.id)
  @JoinColumn({ name: "doctor_id" })
  doctor: DoctorEntity;
}
