import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from "typeorm";
import { BillingEntity, DoctorEntity, FeedbackEntity, MedicalLabRecordEntity, OtpEntity, SessionEntity } from "./doctor.entity";
import { AppointmentEntity } from "./appoinment.entity";
  



@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient)
  appointments: AppointmentEntity[];

  @OneToMany(() => MedicalLabRecordEntity, (record) => record.user)
  medicalLabRecords: MedicalLabRecordEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  feedbacks: FeedbackEntity[];

  @OneToMany(() => BillingEntity, (billing) => billing.user)
  billings: BillingEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @OneToMany(() => OtpEntity, (otp) => otp.user)
  otp: OtpEntity[];

  // @OneToMany(() => DoctorEntity, doctor => doctor.user)
  // doctors: DoctorEntity[];

  @OneToOne(() => DoctorEntity, (doctor)=>doctor.user)
  doctor: DoctorEntity
}