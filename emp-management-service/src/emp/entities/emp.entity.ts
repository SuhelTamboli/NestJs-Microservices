import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  empid: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 10, // restrict to 10 characters
    nullable: false,
  })
  phone: string; // must be string to enforce length

  @Column({ nullable: false })
  gender: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  dob: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  age: number; // numeric field (no length allowed)

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  salary: number;
}
